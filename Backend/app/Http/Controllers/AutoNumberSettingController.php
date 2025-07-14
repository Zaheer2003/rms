<?php

namespace App\Http\Controllers;

use App\Models\AutoNumberSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AutoNumberSettingController extends Controller
{
    public function show($module)
    {
        $setting = AutoNumberSetting::firstOrCreate([
            'user_id' => Auth::id(),
            'module_name' => $module,
        ], [
            'current_number' => '000001',
            'digits' => 6,
        ]);

        return response()->json($setting);
    }

    public function update(Request $request, $module)
    {
        $data = $request->validate([
            'current_number' => 'required|string',
            'digits' => 'required|integer|min:1',
            'prefix' => 'nullable|string',
            'add_prefix' => 'required|boolean',
            'require_unique' => 'required|boolean',
        ]);

        $setting = AutoNumberSetting::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'module_name' => $module,
            ],
            $data
        );

        return response()->json($setting);
    }
}
