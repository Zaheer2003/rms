<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Test;

class TestController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
        ]);

        Test::create([
            'name' => $request->name,
            'email' => $request->email,
            'user_id' => Auth::id(), // ✅ Adds the logged-in user's ID
        ]);

        return response()->json(['message' => 'Saved successfully']);
    }


public function index(Request $request)
{
    $user = Auth::user(); // Get logged-in user
    $tests = Test::where('user_id', $user->id)->get();

    return response()->json($tests);
}

}
