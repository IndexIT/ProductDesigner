<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
      $validator = Validator::make($request->all(), [
        'name' => 'required',
        'email' => 'required|email|unique:users',
        'password' => 'required|confirmed|min:6',
        // 'g-recapture-response' => 'recaptcha'
      ]);

      if($validator->fails()){
        return response()->json(['errors' => $validator->errors()->all()]);
      }

      $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => bcrypt($request->password)
      ]);

      $token = $user->createToken('ProductDesigner')->accessToken;

      return response()->json(['token' => $token, 'success' => true, ], 200);
    }

    public function login(Request $request)
    {
      $validator = Validator::make($request->all(), [
        'email' => 'required|email',
        'password' => 'required|min:6',
      ]);

      if($validator->fails()){
        return response()->json(['errors' => $validator->errors()->all()]);
      }

      $credentials = [
        'email' => $request->email,
        'password' => $request->password,
      ];

      if(auth()->attempt($credentials)){
        $token = auth()->user()->createToken('ProductDesigner')->accessToken;
        return response()->json(['token' => $token, 'success' => true, ], 200);
      }else{
        return response()->json(['error' => 'UnAuthorised', 'success' => false], 401);
      }
    }
}
