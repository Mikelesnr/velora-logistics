<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Shop extends Model
{
    use HasFactory, HasUuids;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'id',
        'owner_entity_id',
        'name',
        'slug',
        'code',
        'category',
        'is_logistics_carrier',
        'brand_primary_color',
        'logo_url',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_logistics_carrier' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    public function ownerEntity(): BelongsTo
    {
        return $this->belongsTo(OwnerEntity::class);
    }

    public function branches(): HasMany
    {
        return $this->hasMany(Branch::class);
    }

    public function memberships(): HasMany
    {
        return $this->hasMany(Membership::class);
    }
}
