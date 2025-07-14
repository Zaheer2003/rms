<?php

namespace App\Http\Controllers;
use App\Models\ex;
use Auth;
use Illuminate\Http\Request;

class exController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
        'firstName'=>'',
        'lastName'=>'', 
        'nic'=>'', 
        'dob'=>'',
        'phone'=>'',
        'mobile'=>'',
        'address1'=>'',
        'address2'=>'',
        'city'=>'',
        'state'=>'',
        'postolCode'=>'',
        'Country'=>'',
        'codeNumber'=>'',
        'email'=>'',
        'currency'=>'',
        'category'=>'',
        'invoicingMethod'=>'',
        'notes'=>'',
        'attachement'=>''
        ]);

        ex::create([
        'firstName',
        'lastName', 
        'nic', 
        'dob',
        'phone',
        'mobile',
        'address1',
        'address2',
        'city',
        'state',
        'postolCode',
        'Country',
        'codeNumber',
        'email',
        'currency',
        'category',
        'invoicingMethod',
        'notes',
        'attachement',
        'user_id' => Auth::id()
        ]);

        return response()->json(['message'=>'Saved Successfully']);
    }
}
