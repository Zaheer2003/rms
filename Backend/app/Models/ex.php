<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ex extends Model
{
    protected $fillable = [
        'firstName',
        'lastName', 
        'nic', 
        'dob',
        'phone',
        'mobile',
        'address1',
        'address2',
        'city',
        'state',
        'postolCode',
        'Country',
        'codeNumber',
        'email',
        'currency',
        'category',
        'invoicingMethod',
        'notes',
        'attachement'
    ];
}
