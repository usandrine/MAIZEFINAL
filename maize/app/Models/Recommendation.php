<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recommendation extends Model
{
    use HasFactory;

    protected $primaryKey = 'rec_id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'field_id',
        'recommendation_date',
        'recommendation_type',
        'message',
        'created_at',
    ];

    /**
     * Get the field that owns the recommendation.
     */
    public function field()
    {
        return $this->belongsTo(Field::class, 'field_id', 'field_id');
    }
}
