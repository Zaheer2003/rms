<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ModulePreference;

class ModulePreferenceController extends Controller
{
    public function index(Request $request)
    {
        $prefs = ModulePreference::where('user_id', $request->user()->id)->get();
        return response()->json($prefs);
    }

    public function store(Request $request)
    {
        $request->validate([
            'module_key' => 'required|string',
            'enabled' => 'required|boolean',
        ]);

        $pref = ModulePreference::updateOrCreate(
            [
                'user_id' => $request->user()->id,
                'module_key' => $request->module_key,
            ],
            [
                'enabled' => $request->enabled,
            ]
        );

        return response()->json($pref);
    }
}