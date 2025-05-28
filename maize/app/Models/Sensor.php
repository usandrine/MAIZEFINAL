<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Sensor extends Model
{
    use HasFactory, HasUuids;

    protected $primaryKey = 'sensor_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'field_id',
        'sensor_type',
        'installation_date',
        'status',
    ];

    /**
     * Get the field that owns the sensor.
     */
    public function field()
    {
        return $this->belongsTo(Field::class, 'field_id', 'field_id');
    }

    /**
     * Get the readings for the sensor.
     */
    public function readings()
    {
        return $this->hasMany(SensorReading::class, 'sensor_id', 'sensor_id');
    }
}
