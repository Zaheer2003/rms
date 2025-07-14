<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'firstName',
        'lastName',
        'mobile',
        'address1',
        'address2',
        'city',
        'state',
        'postalCode',
        'country',
        'code',
        'currency',
        'email',
        'category',
        'invoicingMethod',
        'notes',
        'attachment',
        'nic',
        'dob',
        'user_id',
        'role',
    ];
}
