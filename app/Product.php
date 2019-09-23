<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'category_id', 'collection_id', 'user_id', 'image_front', 'image_back'];

    public function user()
    {
      return $this->belongsTo('App\User');
    }
}
