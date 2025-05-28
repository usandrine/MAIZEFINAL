<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SensorReading extends Model
{
    use HasFactory;

    protected $primaryKey = 'reading_id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'sensor_id',
        'timestamp',
        'value',
    ];

    /**
     * Get the sensor that owns the reading.
     */
    public function sensor()
    {
        return $this->belongsTo(Sensor::class, 'sensor_id', 'sensor_id');
    }
}
