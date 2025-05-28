<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoricalYield extends Model
{
    use HasFactory;

    protected $primaryKey = 'hist_id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'region_or_field',
        'year',
        'yield_t_ha',
        'source',
    ];
}
