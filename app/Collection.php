<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    protected $fillable = ['name', 'image'];

    public function products()
    {
      return $this->hasMany('App\Product');
    }
}
