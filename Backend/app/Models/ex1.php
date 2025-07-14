<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ex1 extends Model
{
    
    protected $fillable = [
        'name',
        'description', 
        'price',      
        'quantity',
    ];
}
