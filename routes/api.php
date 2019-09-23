<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['auth:api']], function(){
  // CATEGORY ROUTES - with token
  Route::post('categories/store', 'CategoryController@storeCategory');
  // PRODUCT ROUTES - with token
  Route::post('products/store', 'ProductController@storeCategory');
  // add a product to collection params(product_id, collection_id)
  Route::post('products/add-collection', 'ProductController@addToCollection');
});

//AUTH ROUTES
Route::post('login', 'AuthController@login');
Route::post('register', 'AuthController@register');
// CATEGORY ROUTES
Route::post('/web/categories/home', 'HomeController@homeCategories');
Route::get('/web/categories/header', 'CategoryController@allCategories');
Route::get('categories/{id}', 'CategoryController@categoryById');
// PRODUCT ROUTES
Route::get('products/all', 'ProductController@allCategories');
Route::get('products/{id}', 'ProductController@categoryById');
// EMAIL ROUTES
Route::post('send-email', 'EmailController@sendEmail');
