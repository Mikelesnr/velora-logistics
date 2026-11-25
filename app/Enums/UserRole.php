<?php

namespace App\Enums;

enum UserRole: string
{
    // Platform / System-Level Roles
    case SYSTEM_ADMIN = 'system_admin';
    case SYSTEM_STAFF = 'system_staff';
    case SYSTEM_ACCOUNTANT = 'system_accountant';
    case SYSTEM_IT_SUPPORT = 'system_it_support';

    // Shop & Branch Operational Roles
    case OWNER = 'owner';
    case MANAGER = 'manager';
    case BRANCH_SUPERVISOR = 'branch_supervisor';
    case STOREFRONT_STAFF = 'storefront_staff';
    case WAREHOUSE_STAFF = 'warehouse_staff';
    case DRIVER = 'driver';

    public function label(): string
    {
        return match ($this) {
            self::SYSTEM_ADMIN => 'System Admin',
            self::SYSTEM_STAFF => 'System Staff',
            self::SYSTEM_ACCOUNTANT => 'System Accountant',
            self::SYSTEM_IT_SUPPORT => 'System IT Support',
            self::OWNER => 'Shop Owner',
            self::MANAGER => 'Shop Manager',
            self::BRANCH_SUPERVISOR => 'Branch Supervisor',
            self::STOREFRONT_STAFF => 'Storefront Staff',
            self::WAREHOUSE_STAFF => 'Warehouse Staff',
            self::DRIVER => 'Driver / Courier',
        };
    }

    public function scope(): string
    {
        return match ($this) {
            self::SYSTEM_ADMIN,
            self::SYSTEM_STAFF,
            self::SYSTEM_ACCOUNTANT,
            self::SYSTEM_IT_SUPPORT => 'system',

            self::OWNER,
            self::MANAGER,
            self::BRANCH_SUPERVISOR,
            self::STOREFRONT_STAFF,
            self::WAREHOUSE_STAFF,
            self::DRIVER => 'shop',
        };
    }

    public function isSystemRole(): bool
    {
        return $this->scope() === 'system';
    }

    public function isShopRole(): bool
    {
        return $this->scope() === 'shop';
    }

    /**
     * @return array<int, self>
     */
    public static function systemRoles(): array
    {
        return [
            self::SYSTEM_ADMIN,
            self::SYSTEM_STAFF,
            self::SYSTEM_ACCOUNTANT,
            self::SYSTEM_IT_SUPPORT,
        ];
    }

    /**
     * @return array<int, self>
     */
    public static function shopRoles(): array
    {
        return [
            self::OWNER,
            self::MANAGER,
            self::BRANCH_SUPERVISOR,
            self::STOREFRONT_STAFF,
            self::WAREHOUSE_STAFF,
            self::DRIVER,
        ];
    }

    /**
     * @return array<int, string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * @return array<int, array{value: string, label: string, scope: string}>
     */
    public static function options(): array
    {
        return array_map(
            fn (self $role) => [
                'value' => $role->value,
                'label' => $role->label(),
                'scope' => $role->scope(),
            ],
            self::cases()
        );
    }
}
