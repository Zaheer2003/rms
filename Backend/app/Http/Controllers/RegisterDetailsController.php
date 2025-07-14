<?php

namespace App\Http\Controllers;

use App\Models\registerdetails;
use Illuminate\Http\Request;

class RegisterDetailsController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'businessName' => 'required|string|max:255',
            'shopType' => 'nullable|string|max:255',
            'shopAddress' => 'nullable|string|max:255',
            'shopWorkers' => 'nullable|string|max:255',
            'shopCurrency' => 'nullable|string|max:255',
            'shopCountry' => 'nullable|string|max:255',
            'clerk_user_id' => 'nullable|string|max:255',
        ]);

        $registerDetails = registerdetails::create($validated);
        return response()->json(['message' => 'Registration details saved successfully', 'data' => $registerDetails], 201);
    }
}
