<?php

namespace App\Models;

use App\Enums\UserRole;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, HasUuids, Notifiable;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'id',
        'name',
        'email',
        'phone',
        'password',
        'role',
        'is_active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => UserRole::class,
            'is_active' => 'boolean',
        ];
    }

    public function memberships(): HasMany
    {
        return $this->hasMany(Membership::class);
    }

    public function ownerEntities(): BelongsToMany
    {
        return $this->belongsToMany(OwnerEntity::class, 'memberships')
            ->withPivot(['id', 'shop_id', 'branch_id', 'role', 'is_active'])
            ->withTimestamps();
    }

    public function shops(): BelongsToMany
    {
        return $this->belongsToMany(Shop::class, 'memberships')
            ->withPivot(['id', 'owner_entity_id', 'branch_id', 'role', 'is_active'])
            ->withTimestamps();
    }

    public function branches(): BelongsToMany
    {
        return $this->belongsToMany(Branch::class, 'memberships')
            ->withPivot(['id', 'owner_entity_id', 'shop_id', 'role', 'is_active'])
            ->withTimestamps();
    }

    public function hasRole(UserRole|string ...$roles): bool
    {
        $normalized = array_map(
            fn (UserRole|string $r) => $r instanceof UserRole ? $r->value : $r,
            $roles
        );

        if ($this->role && in_array($this->role->value, $normalized, true)) {
            return true;
        }

        return $this->memberships()
            ->where('is_active', true)
            ->whereIn('role', $normalized)
            ->exists();
    }

    public function isSystemAdmin(): bool
    {
        return $this->role === UserRole::SYSTEM_ADMIN;
    }

    public function isSystemStaffMember(): bool
    {
        return $this->role?->isSystemRole() ?? false;
    }
}
