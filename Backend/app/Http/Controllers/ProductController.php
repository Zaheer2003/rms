<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::guard('sanctum')->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        $product = DB::table('products')->insertGetId([
            'name' => $request->name,
            'description' => $request->description,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'Product created successfully', 'id' => $product], 201);
    }

    public function index()
    {
        $user = Auth::guard('sanctum')->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $products = DB::table('products')->get();
        return response()->json($products);
    }
}
