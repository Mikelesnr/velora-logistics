<?php

namespace App\Http\Middleware;

use App\Enums\UserRole;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'role' => $user->role?->value,
                    'role_label' => $user->role?->label(),
                    'role_scope' => $user->role?->scope(),
                    'memberships' => $user->memberships()
                        ->with(['ownerEntity:id,name,type', 'shop:id,name,slug', 'branch:id,name,code,branch_type'])
                        ->where('is_active', true)
                        ->get(),
                ] : null,
            ],
            'roles' => UserRole::options(),
            'flash' => [
                'status' => fn () => $request->session()->get('status'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ];
    }
}
