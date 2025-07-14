<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'attachment' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // 2MB
        ]);

        $category = new Category();
        $category->name = $request->name;
        $category->description = $request->description;
        $category->user_id = auth()->id(); // Set user_id to the authenticated user
        $user = User::find(auth()->id());
        $userName = $user ? $user->name : 'Unknown User';
        if ($request->hasFile('attachment')) {
            $path = $request->file('attachment')->store('categories', 'public');
            $category->categoryLogo = $path; // Store the file path in the categoryLogo field
        } else {
            $category->categoryLogo = null; // No file uploaded
        }

        $user_id = $category->user_id = Auth::id();

        $category->save();

        Activity::create([
            'title' => 'Category Created',
            'description' => $userName . ' created a new category: ' . $category->name,
            'icon_bg' => '#5f76e8',
            'icon' => 'FileText',
            'user_id' =>$user_id,
            'date' => now()
        ]);

        return response()->json(['message' => 'Category created successfully', 'category' => $category], 201);
    }

    public function destroy($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message'=>'Category not found'], 404);
        }
        $categoryName = $category->name;
        $user = User::find(auth()->id());
        $userName = $user ? $user->name : 'Unknown User';
        $user_id = $category->user_id = Auth::id();
        $category->delete();

        Activity::create([
            'title' => 'Category Deleted',
            'description' => $userName . ' deleted the category '. $categoryName ,
            'icon_bg' => '#e53e3e',
            'icon' =>'FileText',
            'user' => $user_id,
            'date' => now()
        ]);
        return response()->json(['message' => 'Category deleted successfully']);
    }

    public function show($id) 
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Categories not found']);
        }
        return response()->json($category);
    }

    public function update(Request $request, $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'attachment' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $category->name = $request->name;
        $category->description = $request->description;

        if ($request->hasFile('attachment')) {
            // Delete old file if exists
            if ($category->categoryLogo) {
                Storage::disk('public')->delete($category->categoryLogo);
            }
            $path = $request->file('attachment')->store('categories', 'public');
            $category->categoryLogo = $path;
        }
        // If no new file uploaded, keep the old one

        $category->save();

        $user = User::find(auth()->id());
        $userName = $user ? $user->name : 'Unknown User';

        Activity::create([
            'title' => 'Category Updated',
            'description' => $userName . ' updated the category: ' . $category->name,
            'icon_bg' => '#38a169',
            'icon' => 'FileText',
            'date' => now(),
        ]);

        return response()->json(['message' => 'Category updated successfully', 'category' => $category]);
    }
}
