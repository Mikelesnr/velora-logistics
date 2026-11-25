<?php

use App\Enums\UserRole;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('owner_entities', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('type')->default('individual')->index(); // individual | institution
            $table->string('name');
            $table->string('legal_name')->nullable();
            $table->string('registration_number')->nullable();
            $table->string('tax_id')->nullable();
            $table->string('billing_email')->nullable();
            $table->string('billing_phone')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('shops', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('owner_entity_id')->constrained('owner_entities')->cascadeOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('code')->nullable()->unique();
            $table->string('category')->default('merchant'); // merchant | carrier | hybrid
            $table->boolean('is_logistics_carrier')->default(false);
            $table->string('brand_primary_color')->default('#0f172a');
            $table->string('logo_url')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('branches', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('shop_id')->constrained('shops')->cascadeOnDelete();
            $table->string('name');
            $table->string('code')->nullable()->index();
            $table->string('branch_type')->default('storefront'); // storefront | hub | warehouse | depot
            $table->string('address_line')->nullable();
            $table->string('city')->nullable();
            $table->string('country')->default('Zimbabwe');
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->unsignedInteger('geofence_radius_meters')->default(150);
            $table->string('contact_phone')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('memberships', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignUuid('owner_entity_id')->nullable()->constrained('owner_entities')->cascadeOnDelete();
            $table->foreignUuid('shop_id')->nullable()->constrained('shops')->cascadeOnDelete();
            $table->foreignUuid('branch_id')->nullable()->constrained('branches')->cascadeOnDelete();
            $table->string('role')->default(UserRole::STOREFRONT_STAFF->value)->index();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['user_id', 'shop_id', 'branch_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('memberships');
        Schema::dropIfExists('branches');
        Schema::dropIfExists('shops');
        Schema::dropIfExists('owner_entities');
    }
};
