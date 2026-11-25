import { Head, Link, usePage } from '@inertiajs/react';
import { Truck, Shield, KeyRound, Network } from 'lucide-react';
import type { PageProps } from '@/types';

interface WelcomeProps {
    appName: string;
}

export default function Welcome({ appName }: WelcomeProps) {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
                <header className="border-b border-slate-800/80">
                    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                        <div className="flex items-center gap-2.5 text-lg font-bold">
                            <Truck className="h-6 w-6 text-sky-400" />
                            <span>{appName}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            {auth?.user ? (
                                <Link
                                    href="/dashboard"
                                    className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-400"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 hover:text-white"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-400"
                                    >
                                        Create Account
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <main className="mx-auto max-w-6xl px-6 py-16">
                    <div className="max-w-3xl">
                        <span className="inline-block rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-300">
                            Laravel 13 + React 19 + TypeScript + Inertia v2 + Sanctum API
                        </span>
                        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                            Unified Fleet, Courier &amp; Multi-Branch Dispatch Engine
                        </h1>
                        <p className="mt-4 text-lg text-slate-400">
                            Built with UUID primary keys for client-side idempotency across Inertia web and React Native mobile apps,
                            string-backed PHP 8.3 <code className="text-sky-300">UserRole</code> enums, and dual session + Bearer API authentication.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 sm:grid-cols-3">
                        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
                            <Shield className="h-6 w-6 text-sky-400" />
                            <h3 className="mt-3 font-semibold text-white">System &amp; Shop RBAC</h3>
                            <p className="mt-2 text-sm text-slate-400">
                                System Admin, Staff, Accountant &amp; IT Support plus Shop Owners, Managers, Branch Supervisors, Storefront, Warehouse &amp; Drivers.
                            </p>
                        </div>
                        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
                            <Network className="h-6 w-6 text-emerald-400" />
                            <h3 className="mt-3 font-semibold text-white">Owner → Shops → Branches</h3>
                            <p className="mt-2 text-sm text-slate-400">
                                Supports both individual and institutional owners managing multiple shops and multi-city branches like DHL hubs.
                            </p>
                        </div>
                        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
                            <KeyRound className="h-6 w-6 text-amber-400" />
                            <h3 className="mt-3 font-semibold text-white">Dual Inertia + API Auth</h3>
                            <p className="mt-2 text-sm text-slate-400">
                                Breeze-style Inertia session login alongside <code className="text-slate-200">/api/v1/auth/*</code> Sanctum endpoints.
                            </p>
                        </div>
                    </div>
                </main>

                <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
                    Velora Logistics TypeScript Starter Kit — Ready for composer install &amp; npm install
                </footer>
            </div>
        </>
    );
}
