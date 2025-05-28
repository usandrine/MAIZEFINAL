<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;   // Laravel 10+ helper
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory, HasUuids;

    protected $primaryKey  = 'product_id';
    public    $incrementing = false;      // UUIDs are not auto‑incrementing
    protected $keyType      = 'string';

    protected $fillable = [
        'name',
        'description',
        'image_url',
        'firmware_version',
        'is_active',
    ];

    /**
     * @OA\Schema(
     *     schema="Product",
     *     type="object",
     *     title="Product",
     *     required={"name"},
     *     @OA\Property(property="product_id", type="string", format="uuid"),
     *     @OA\Property(property="name", type="string"),
     *     @OA\Property(property="description", type="string"),
     *     @OA\Property(property="image_url", type="string"),
     *     @OA\Property(property="firmware_version", type="string"),
     *     @OA\Property(property="is_active", type="boolean")
     * )
     */
}
