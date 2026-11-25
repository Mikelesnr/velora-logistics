<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Models\Branch;
use App\Models\OwnerEntity;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $user = $request->user();

        $stats = [
            'users_count' => User::count(),
            'owner_entities_count' => OwnerEntity::count(),
            'shops_count' => Shop::count(),
            'branches_count' => Branch::count(),
        ];

        $recentUsers = $user->isSystemStaffMember()
            ? User::latest()->take(15)->get(['id', 'name', 'email', 'role', 'is_active', 'created_at'])
            : [];

        $shops = Shop::with(['ownerEntity:id,name,type', 'branches:id,shop_id,name,code,branch_type,city'])
            ->latest()
            ->take(20)
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'recentUsers' => $recentUsers,
            'shops' => $shops,
            'systemRoles' => array_map(fn (UserRole $r) => ['value' => $r->value, 'label' => $r->label()], UserRole::systemRoles()),
            'shopRoles' => array_map(fn (UserRole $r) => ['value' => $r->value, 'label' => $r->label()], UserRole::shopRoles()),
        ]);
    }
}
