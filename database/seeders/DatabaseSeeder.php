<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\Branch;
use App\Models\Membership;
use App\Models\OwnerEntity;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $adminEmail = (string) env('SEED_ADMIN_EMAIL', 'admin@veloralogistics.local');
        $adminPassword = (string) env('SEED_ADMIN_PASSWORD', 'ChangeMeAdmin123!');
        $generalUserPassword = (string) env('SEED_USER_PASSWORD', 'ChangeMeUser123!');

        $admin = User::updateOrCreate(
            ['email' => $adminEmail],
            [
                'id' => (string) Str::uuid(),
                'name' => 'Platform Super Admin',
                'password' => $adminPassword,
                'role' => UserRole::SYSTEM_ADMIN,
                'email_verified_at' => now(),
            ]
        );

        $institution = OwnerEntity::create([
            'id' => (string) Str::uuid(),
            'type' => 'institution',
            'name' => 'DHL Express Southern Africa',
            'legal_name' => 'DHL International (Pvt) Ltd',
            'billing_email' => 'billing@dhl-demo.local',
        ]);

        $shop = Shop::create([
            'id' => (string) Str::uuid(),
            'owner_entity_id' => $institution->id,
            'name' => 'DHL Express',
            'slug' => 'dhl-express',
            'code' => 'DHL-ZW',
            'category' => 'carrier',
            'is_logistics_carrier' => true,
            'brand_primary_color' => '#D40511',
        ]);

        $airportHub = Branch::create([
            'id' => (string) Str::uuid(),
            'shop_id' => $shop->id,
            'name' => 'DHL Harare Airport Hub',
            'code' => 'HRE-HUB-01',
            'branch_type' => 'hub',
            'city' => 'Harare',
            'country' => 'Zimbabwe',
        ]);

        $avondaleBranch = Branch::create([
            'id' => (string) Str::uuid(),
            'shop_id' => $shop->id,
            'name' => 'DHL Avondale Service Point',
            'code' => 'HRE-AVN-02',
            'branch_type' => 'storefront',
            'city' => 'Harare',
            'country' => 'Zimbabwe',
        ]);

        $ownerUser = User::updateOrCreate(
            ['email' => 'owner@dhl-demo.local'],
            [
                'id' => (string) Str::uuid(),
                'name' => 'Regional Operations Owner',
                'password' => $generalUserPassword,
                'role' => UserRole::OWNER,
                'email_verified_at' => now(),
            ]
        );

        Membership::create([
            'id' => (string) Str::uuid(),
            'user_id' => $ownerUser->id,
            'owner_entity_id' => $institution->id,
            'shop_id' => $shop->id,
            'branch_id' => null,
            'role' => UserRole::OWNER,
        ]);

        $driverUser = User::updateOrCreate(
            ['email' => 'driver@dhl-demo.local'],
            [
                'id' => (string) Str::uuid(),
                'name' => 'Tendai Courier',
                'password' => $generalUserPassword,
                'role' => UserRole::DRIVER,
                'email_verified_at' => now(),
            ]
        );

        Membership::create([
            'id' => (string) Str::uuid(),
            'user_id' => $driverUser->id,
            'owner_entity_id' => $institution->id,
            'shop_id' => $shop->id,
            'branch_id' => $airportHub->id,
            'role' => UserRole::DRIVER,
        ]);
    }
}
