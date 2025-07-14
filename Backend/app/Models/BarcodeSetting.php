<?php
// app/Models/BarcodeSetting.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BarcodeSetting extends Model
{
    protected $fillable = [
        'type', 'enable_weight', 'embedded_format', 'weight_divider', 'currency_divider', 'user_id'
    ];
}
