<?php

namespace App\Http\Controllers;
use App\Models\ex1 ;
use Illuminate\Http\Request;

class ex1Controller extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string', // use string, not "text"
            'price' => 'required|numeric',      // use numeric, not "decimal"
            'quantity' => 'required|integer',   // correct spelling: "quantity"
        ]);

        Ex1::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'quanity' => $request->quanity,

        ]); // if fillable fields are defined in the model
    }
}
