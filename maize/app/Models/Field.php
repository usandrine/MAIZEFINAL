<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Field extends Model
{
    use HasFactory, HasUuids;

    protected $primaryKey = 'field_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'farmer_id',
        'name',
        'area_ha',
        'soil_type',
        'latitude',
        'longitude',
        'created_at',
    ];

    /**
     * Get the farmer that owns the field.
     */
    public function farmer()
    {
        return $this->belongsTo(Farmer::class, 'farmer_id', 'farmer_id');
    }

    /**
     * Get the sensors for the field.
     */
    public function sensors()
    {
        return $this->hasMany(Sensor::class, 'field_id', 'field_id');
    }

    /**
     * Get the yield predictions for the field.
     */
    public function yieldPredictions()
    {
        return $this->hasMany(YieldPrediction::class, 'field_id', 'field_id');
    }

    /**
     * Get the recommendations for the field.
     */
    public function recommendations()
    {
        return $this->hasMany(Recommendation::class, 'field_id', 'field_id');
    }
}
