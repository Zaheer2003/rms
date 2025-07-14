<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class SupplierController extends Controller
{
    public function store(Request $request)
{
    $request->validate([
        'businessName'=>'required|string',
        'firstName' => 'required|string',
        'lastName' => 'required|string',
        'supplierNumber' => 'required|string',
        'email'=>'required|string'
    ]);

    Supplier::create([
        'businessName' => $request->businessName,
        'firstName' => $request->firstName,
        'lastName' => $request->lastName,
        'supplierNumber' =>$request->supplierNumber,
        'email' => $request->email,
        'user_id' => Auth::id()
    ]);

    return response()->json([
        'message' => 'Saved Successfully'
    ]);
}

public function index(Request $request)
{
    $user = Auth::user();
    $suppliers = Supplier::where('user_id', $user->id)->get();

    return response()->json($suppliers);
}

}
