<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class registerdetails extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'businessName',
        'shopType',
        'shopAddress',
        'shopWorkers',
        'shopCurrency',
        'shopCountry',
        'clerk_user_id',
    ];
}
