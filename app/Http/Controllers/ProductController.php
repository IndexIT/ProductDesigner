<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
class ProductController extends Controller
{
  // GET ALL PRODUCTS
  public function allProducts()
  {
      $products= Product::get();
      if($products->count > 0){
          return response()->json(['success' => true, 'products' => $products]);
      }
      return response()->json(['success' => false]);
  }
  // GET A PRODUCT BY ID
  public function productById($id)
  {
      $product = Product::where('id', $id)->first();
      if(isset($product)){
        return response()->json(['success' => true, 'product' => $product]);
      }
      return response()->json(['success' => false]);
  }
  // CREATE CATEGORY
  public function storeProduct(Request $request)
  {
      $validator = Validator::make($request->all(), [
        'name' => 'required|string',
        'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        'category_id' => 'required'
      ]);

      if($validator->fails()){
        return response()->json(['errors' => $validator->errors()->all()]);
      }
      // Vendor name
      $vendorName = '';
      if($request->has('vendorName')){
        $vendorName = $request->input('vendorName');
      }
      // image upload - front
      $imageNameFront = time().'_front.'.request()->image_front->getClientOriginalExtension();
      request()->image_front->move(public_path('images/products'), $imageNameFront);
      // image upload - back
      $imageNameBack = time().'_back.'.request()->image_back->getClientOriginalExtension();
      request()->image_back->move(public_path('images/products'), $imageNameBack);

      // Add product to db
      Product::create([
        'name' => $request->input('name'),
        'vendorName' => $vendorName,
        'image_front' => $imageNameFront,
        'image_back' => $imageNameBack,
        'category_id' => $request->input('category_id'),
        'user_id' => Auth()->user()->id
      ]);

      return response()->json(['success' => true]);
  }
}
