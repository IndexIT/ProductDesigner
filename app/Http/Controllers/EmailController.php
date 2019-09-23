<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;
use Validator;

class EmailController extends Controller
{
    public function sendEmail(Request $request)
    {
      $validator = Validator::make($request->all(), [
        'message' => 'required|string',
        'email' => 'required|email',
      ]);

      if($validator->fails()){
        return response()->json(['errors' => $validator->errors()->all()]);
      }

      $data = [
        'msg' => $request->input('message'),
        'email' => $request->input('email')
      ];

      Mail::send('emails.email', $data, function($message) use ($data) {
            $message->to($data['email'], 'Test')
                    ->subject('Email from ');
      });

      if(Mail::failures()) {
           return response()->json(['success' => false, 'message' => 'Unable to send email']);
      }else{
           return response()->json(['success' => true, 'message' => 'Email send successfully']);
      }
    }
}
