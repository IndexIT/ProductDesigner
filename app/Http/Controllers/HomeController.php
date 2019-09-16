<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use App\Category;
use App\Collection;

class HomeController extends Controller
{
    public function homeCategories(Request $request)
    {
        $recommended = Category::limit(4)->with('subCategories')->get();
        $staff_picks = Category::where('name', 'staff_picks')->with('subCategories')->get();
        $featured_collections = Collection::limit(3)->get();
        $trending_collections = Collection::limit(2)->with('products')->get();

        return response()->json(['recomended' => $recommended, 'staff_picks' => $staff_picks,
                                  'featured_collections' => $featured_collections,
                                  'trending_collections' => $trending_collections]);
    }
}
