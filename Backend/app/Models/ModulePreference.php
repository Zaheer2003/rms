<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ModulePreference extends Model
{
    protected $fillable = ['user_id', 'module_key', 'enabled'];
}