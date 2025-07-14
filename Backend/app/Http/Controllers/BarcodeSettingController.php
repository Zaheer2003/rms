<?php
// app/Http/Controllers/BarcodeSettingController.php
namespace App\Http\Controllers;

use App\Models\BarcodeSetting;
use Illuminate\Http\Request;

class BarcodeSettingController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();
        $setting = BarcodeSetting::where('user_id', $user->id)->first();
        if (!$setting) {
            // Optionally, return default settings if none exist
            return response()->json([
                'type' => 'CODE128',
                'enable_weight' => false,
                'embedded_format' => '',
                'weight_divider' => 1000,
                'currency_divider' => 100,
            ]);
        }
        return $setting;
    }

    public function update(Request $request)
    {
        $user = $request->user();
        $setting = BarcodeSetting::where('user_id', $user->id)->first() ?? new BarcodeSetting(['user_id' => $user->id]);
        $setting->fill($request->only([
            'type',
            'enable_weight',
            'embedded_format',
            'weight_divider',
            'currency_divider',
        ]));
        $setting->user_id = $user->id;
        $setting->save();
        return $setting;
    }
}
