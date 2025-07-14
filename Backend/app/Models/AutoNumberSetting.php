<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AutoNumberSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'module_name',
        'current_number',
        'digits',
        'prefix',
        'add_prefix',
        'require_unique',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
