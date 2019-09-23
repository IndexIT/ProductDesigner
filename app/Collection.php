<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    protected $fillable = ['name', 'image', 'user_id'];

    public function products()
    {
      return $this->hasMany('App\Product');
    }

    public function user()
    {
      return $this->belongsTo('App\User');
    }
}
