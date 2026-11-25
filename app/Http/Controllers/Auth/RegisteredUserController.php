<?php

namespace App\Http\Controllers\Auth;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\Membership;
use App\Models\OwnerEntity;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'id' => ['nullable', 'uuid'], // Client-generated UUID for idempotency
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'phone' => ['nullable', 'string', 'max:30', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'owner_type' => ['required', Rule::in(['individual', 'institution'])],
            'organization_name' => ['required', 'string', 'max:255'],
            'shop_name' => ['required', 'string', 'max:255'],
            'branch_name' => ['required', 'string', 'max:255'],
            'is_logistics_carrier' => ['boolean'],
        ]);

        $user = DB::transaction(function () use ($validated) {
            $user = User::create([
                'id' => $validated['id'] ?? (string) Str::uuid(),
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'] ?? null,
                'password' => Hash::make($validated['password']),
                'role' => UserRole::OWNER,
            ]);

            $ownerEntity = OwnerEntity::create([
                'id' => (string) Str::uuid(),
                'type' => $validated['owner_type'],
                'name' => $validated['organization_name'],
                'billing_email' => $validated['email'],
                'billing_phone' => $validated['phone'] ?? null,
            ]);

            $shop = Shop::create([
                'id' => (string) Str::uuid(),
                'owner_entity_id' => $ownerEntity->id,
                'name' => $validated['shop_name'],
                'slug' => Str::slug($validated['shop_name']).'-'.Str::lower(Str::random(5)),
                'category' => ! empty($validated['is_logistics_carrier']) ? 'carrier' : 'merchant',
                'is_logistics_carrier' => (bool) ($validated['is_logistics_carrier'] ?? false),
            ]);

            $branch = Branch::create([
                'id' => (string) Str::uuid(),
                'shop_id' => $shop->id,
                'name' => $validated['branch_name'],
                'code' => 'BR-'.strtoupper(Str::random(4)),
                'branch_type' => ! empty($validated['is_logistics_carrier']) ? 'hub' : 'storefront',
            ]);

            Membership::create([
                'id' => (string) Str::uuid(),
                'user_id' => $user->id,
                'owner_entity_id' => $ownerEntity->id,
                'shop_id' => $shop->id,
                'branch_id' => $branch->id,
                'role' => UserRole::OWNER,
            ]);

            return $user;
        });

        event(new Registered($user));
        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
