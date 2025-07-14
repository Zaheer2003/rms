<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

class ForgotPasswordController extends Controller
{
    public function sendResetLinkEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        // Customize the reset URL to point to the Next.js frontend
        Password::createUrlUsing(function ($user, string $token) use ($request) {
            $frontendUrl = 'http://localhost:3000/auth/reset-password';
            $email = urlencode($request->email);
            return "$frontendUrl?token=$token&email=$email";
        });

        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json(['message' => 'Password reset link sent!'], 200);
        } else {
            return response()->json(['message' => 'Unable to send reset link.'], 500);
        }
    }
}
