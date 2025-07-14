<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Shop extends Model
{
    use HasFactory;

    protected $fillable = [
        'business_name',
        'shop_type',
        'shop_address',
        'shop_workers',
        'shop_currency',
        'shop_country',
        'owner_id',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }
}
