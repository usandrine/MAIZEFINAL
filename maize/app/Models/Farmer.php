<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Farmer extends Model
{
    use HasFactory, HasUuids;

    protected $primaryKey = 'farmer_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'user_id', // new field for linking to users
        'name',
        'email',
        'phone',
        'region',
        'registered_at',
    ];

    /**
     * Get the user account associated with the farmer.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the fields (plots) owned by the farmer.
     */
    public function fields()
    {
        return $this->hasMany(Field::class, 'farmer_id', 'farmer_id');
    }
}
