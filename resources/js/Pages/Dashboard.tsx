import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { Building2, Store, GitBranch, Users } from 'lucide-react';
import type { ComponentType } from 'react';
import type {
    DashboardStats,
    ManagedUser,
    PageProps,
    ShopWithBranches,
    UserRoleValue,
} from '@/types';

interface RoleChoice {
    value: UserRoleValue;
    label: string;
}

interface DashboardProps {
    stats: DashboardStats;
    recentUsers: ManagedUser[];
    shops: ShopWithBranches[];
    systemRoles: RoleChoice[];
    shopRoles: RoleChoice[];
}

export default function Dashboard({
    stats,
    recentUsers,
    shops,
    systemRoles,
    shopRoles,
}: DashboardProps) {
    const { auth } = usePage<PageProps>().props;
    const isSystemAdmin = auth?.user?.role === 'system_admin';
    const allRoles = [...systemRoles, ...shopRoles];

    const handleRoleChange = (userId: string, newRole: UserRoleValue) => {
        router.patch(
            `/system/users/${userId}/role`,
            { role: newRole },
            { preserveScroll: true }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h1 className="text-2xl font-bold text-white">Logistics &amp; Tenant Control Tower</h1>
                    <p className="text-sm text-slate-400">
                        Active UUID: <code className="text-sky-400">{auth?.user?.id}</code>
                    </p>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard icon={Users} label="Total Users" value={stats.users_count} />
                <StatCard icon={Building2} label="Owner Entities" value={stats.owner_entities_count} />
                <StatCard icon={Store} label="Shops / Brands" value={stats.shops_count} />
                <StatCard icon={GitBranch} label="Branches / Hubs" value={stats.branches_count} />
            </div>

            {isSystemAdmin && recentUsers.length > 0 && (
                <section className="mt-8 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
                    <h2 className="text-lg font-semibold text-white">System Admin — User Role Assignments</h2>
                    <p className="mt-1 text-xs text-slate-400">
                        Assign System Admin, System Staff, System Accountant, System IT Support, or Shop roles.
                    </p>

                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-slate-800 text-xs uppercase text-slate-400">
                                <tr>
                                    <th className="py-3 pr-4">User</th>
                                    <th className="py-3 pr-4">UUID</th>
                                    <th className="py-3 pr-4">Assigned Role</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/70">
                                {recentUsers.map((u) => (
                                    <tr key={u.id}>
                                        <td className="py-3 pr-4">
                                            <div className="font-medium text-white">{u.name}</div>
                                            <div className="text-xs text-slate-400">{u.email}</div>
                                        </td>
                                        <td className="py-3 pr-4 font-mono text-xs text-slate-400">{u.id}</td>
                                        <td className="py-3 pr-4">
                                            <select
                                                value={u.role}
                                                onChange={(e) =>
                                                    handleRoleChange(u.id, e.target.value as UserRoleValue)
                                                }
                                                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white"
                                            >
                                                {allRoles.map((r) => (
                                                    <option key={r.value} value={r.value}>
                                                        {r.label} ({r.value})
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            <section className="mt-8 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
                <h2 className="text-lg font-semibold text-white">Shops &amp; Physical Branches</h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {shops.map((shop) => (
                        <div key={shop.id} className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-white">{shop.name}</span>
                                <span className="rounded bg-slate-800 px-2 py-0.5 text-xs text-sky-300">
                                    {shop.owner_entity?.type}: {shop.owner_entity?.name}
                                </span>
                            </div>
                            <div className="mt-3 space-y-1.5">
                                {shop.branches?.map((b) => (
                                    <div
                                        key={b.id}
                                        className="flex items-center justify-between rounded border border-slate-800/80 bg-slate-900/60 px-3 py-1.5 text-xs"
                                    >
                                        <span className="text-slate-200">{b.name}</span>
                                        <span className="text-slate-400">
                                            {b.branch_type} • {b.code}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </AuthenticatedLayout>
    );
}

interface StatCardProps {
    icon: ComponentType<{ className?: string }>;
    label: string;
    value: number;
}

function StatCard({ icon: Icon, label, value }: StatCardProps) {
    return (
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{label}</span>
                <Icon className="h-5 w-5 text-sky-400" />
            </div>
            <div className="mt-2 text-2xl font-bold text-white">{value}</div>
        </div>
    );
}
