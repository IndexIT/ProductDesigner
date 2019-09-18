<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;
use Validator;

class CategoryController extends Controller
{
    // GET ALL CATEGORIES WITH SUB CATEGORIES
    public function allCategories()
    {
        $categories = Category::with('subCategories')->get();
        if($categories->count > 0){
            return response()->json(['success' => true, 'categories' => $categories]);
        }
        return response()->json(['success' => false]);
    }
    // GET A CATEGORY BY ID
    public function categoryById($id)
    {
        $category = Category::with('subCategories')->where('id', $id)->first();
        if(isset($category)){
          return response()->json(['success' => true, 'category' => $category]);
        }
        return response()->json(['success' => false]);
    }
    // CREATE CATEGORY
    public function storeCategory(Request $request)
    {
        $validator = Validator::make($request->all(), [
          'name' => 'required|string',
          'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if($validator->fails()){
          return response()->json(['errors' => $validator->errors()->all()]);
        }
        // Vendor name
        $vendorName = '';
        if($request->has('vendorName')){
          $vendorName = $request->input('vendorName');
        }
        // image upload
        $imageName = time().'.'.request()->image->getClientOriginalExtension();
        request()->image->move(public_path('images'), $imageName);
        // Add category to db
        Category::create([
          'name' => $request->input('name'),
          'vendorName' => $vendorName,
          'image' => $imageName
        ]);

        return response()->json(['success' => true]);
    }

}
