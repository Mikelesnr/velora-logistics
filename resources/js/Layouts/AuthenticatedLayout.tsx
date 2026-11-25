import { Link, usePage } from '@inertiajs/react';
import { Truck, ShieldCheck, LogOut, LayoutDashboard } from 'lucide-react';
import type { ReactNode } from 'react';
import type { PageProps } from '@/types';

interface AuthenticatedLayoutProps {
    header?: ReactNode;
    children: ReactNode;
}

export default function AuthenticatedLayout({ header, children }: AuthenticatedLayoutProps) {
    const { auth, flash } = usePage<PageProps>().props;
    const user = auth?.user;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-6">
                        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-white">
                            <Truck className="h-6 w-6 text-sky-400" />
                            <span>Velora Logistics</span>
                        </Link>
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white"
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            Control Tower
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="text-sm font-medium text-white">{user?.name}</div>
                            <div className="inline-flex items-center gap-1 text-xs text-sky-400">
                                <ShieldCheck className="h-3.5 w-3.5" />
                                {user?.role_label} ({user?.role_scope})
                            </div>
                        </div>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700"
                        >
                            <LogOut className="h-3.5 w-3.5" />
                            Logout
                        </Link>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="border-b border-slate-800/70 bg-slate-900/40">
                    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {flash?.status && (
                    <div className="mb-6 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                        {flash.status}
                    </div>
                )}
                {flash?.error && (
                    <div className="mb-6 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
                        {flash.error}
                    </div>
                )}
                {children}
            </main>
        </div>
    );
}
