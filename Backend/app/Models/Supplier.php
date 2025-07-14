<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    protected $fillable = [

    'businessName',
    'firstName',
    'lastName',
    'supplierNumber',
    'email',
    'user_id'
];


}
