<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class YieldPrediction extends Model
{
    use HasFactory;

    protected $primaryKey = 'prediction_id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'field_id',
        'model_version',
        'prediction_date',
        'predicted_yield_t_ha',
        'created_at',
    ];

    /**
     * Get the field that owns the yield prediction.
     */
    public function field()
    {
        return $this->belongsTo(Field::class, 'field_id', 'field_id');
    }
}
