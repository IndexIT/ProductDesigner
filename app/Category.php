<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'vendorName', 'image'];

    public function subCategories()
    {
      return $this->hasMany('App\SubCategory');
    }
}
