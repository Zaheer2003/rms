<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeMail;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'phone' => 'nullable|string|max:20',
            'business_name' => 'required|string|max:255',
            'shop_type' => 'nullable|string|max:255',
            'shop_address' => 'nullable|string|max:255',
            'shop_workers' => 'nullable|string|max:255',
            'shop_currency' => 'nullable|string|max:255',
            'shop_country' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'business_name' => $request->business_name,
            'role_id' => 1, // Owner/Admin
        ]);

        $shop = Shop::create([
            'business_name' => $request->business_name,
            'shop_type' => $request->shop_type,
            'shop_address' => $request->shop_address,
            'shop_workers' => $request->shop_workers,
            'shop_currency' => $request->shop_currency,
            'shop_country' => $request->shop_country,
            'owner_id' => $user->id,
        ]);

        // Send welcome email
        Mail::to($user->email)->send(new WelcomeMail($user, $shop));

        return response()->json(['message' => 'Registration successful', 'user' => $user, 'shop' => $shop], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['message' => 'Login successful', 'token' => $token, 'user' => $user], 200);
    }
    public function logout(Request $request)
    {
        $user = $request->user();
        $user->tokens()->delete();

        return response()->json(['message' => 'Logout successful'], 200);
    }
}
