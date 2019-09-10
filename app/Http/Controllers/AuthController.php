<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
      $validator = Validator::make($request, [
        'name' => 'required',
        'email' => 'required|email|confirmed|unique:users',
        'password' => 'required|min:6',
        'g-recapture-response' => 'recaptcha'
      ]);

      if($validator->errors){
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
      $validator = Validator::make($request, [
        'email' => 'required|email|confirmed|unique:users',
        'password' => 'required|min:6',
      ]);

      if($validator->errors){
        return response()->json(['token' => $token, 'success' => true, ], 200);
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
