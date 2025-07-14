<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BrandController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'brandLogo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'description' => 'nullable|string',
        ]);

        $brand = new Brand();
        $brand->name = $request->name;
        $brand->description = $request->description;
        $brand->user_id = Auth::id();

        if ($request->hasFile('brandLogo')) {
            $path = $request->file('brandLogo')->store('brands', 'public');
            $brand->brandLogo = $path;
        } else {
            $brand->brandLogo = null;
        }
        $user_id = $brand->user_id = Auth::id();
        $brand->save();

        // Log activity
        Activity::create([
            'title' => 'Brand Added',
            'description' => 'User added a new brand: ' . $brand->name,
            'icon_bg' => '#5f76e8',
            'icon' => 'FileText',
            'user_id' => $user_id,
            'date' => now()
        ]);

        return response()->json(['message' => 'Brand created successfully', 'brand' => $brand], 201);
    }

    public function index(Request $request)
    {
        // Return all brands (not just for the authenticated user)
        $brands = Brand::all();
        return response()->json($brands);
    }

    public function show($id)
    {
        $brand = Brand::find($id);
        if (!$brand) {
            return response()->json(['message' => 'Brand not found'], 404);
        }
        return response()->json($brand);
    }

    public function update(Request $request, $id)
    {
        $brand = Brand::find($id);
        if (!$brand) {
            return response()->json(['message' => 'Brand not found'], 404);
        }
        $request->validate([
            'name' => 'required|string|max:255',
            'brandLogo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'description' => 'nullable|string',
        ]);
        $brand->name = $request->name;
        $brand->description = $request->description;
        if ($request->hasFile('brandLogo')) {
            $path = $request->file('brandLogo')->store('brands', 'public');
            $brand->brandLogo = $path;
        }
        $user_id = $brand->user_id = Auth::id();
        $brand->save();
        // Log activity
        Activity::create([
            'title' => 'Brand Updated',
            'description' => 'User updated the brand: ' . $brand->name,
            'icon_bg' => '#fbbf24', // amber for update
            'icon' => 'FileText',
            'user_id'=> $user_id,
            'date' => now()
        ]);
        return response()->json(['message' => 'Brand updated successfully', 'brand' => $brand]);
    }

    public function destroy($id)
    {
        $brand = Brand::find($id);
        if (!$brand) {
            return response()->json(['message' => 'Brand not found'], 404);
        }
        $brandName = $brand->name;
        $user_id = $brand->user_id = Auth::id();
        $brand->delete();
        // Log activity
        Activity::create([
            'title' => 'Brand Deleted',
            'description' => 'User deleted the brand: ' . $brandName,
            'icon_bg' => '#e53e3e', // red for delete
            'icon' => 'FileText',
            'user_id'=>$user_id,
            'date' => now()
        ]);
        return response()->json(['message' => 'Brand deleted successfully']);
    }
}
