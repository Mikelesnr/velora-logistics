import { Head, Link, useForm } from '@inertiajs/react';
import { Truck } from 'lucide-react';
import type { FormEvent } from 'react';

interface LoginProps {
    status?: string | null;
}

interface LoginFormData {
    email: string;
    password: string;
    remember: boolean;
}

export default function Login({ status }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginFormData>({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />
            <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4">
                <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
                    <div className="mb-6 flex items-center gap-2.5">
                        <Truck className="h-7 w-7 text-sky-400" />
                        <h1 className="text-xl font-bold text-white">Sign in to Velora</h1>
                    </div>

                    {status && (
                        <div className="mb-4 rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-300">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white focus:border-sky-500 focus:outline-none"
                                required
                                autoFocus
                            />
                            {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300">Password</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white focus:border-sky-500 focus:outline-none"
                                required
                            />
                            {errors.password && <p className="mt-1 text-xs text-rose-400">{errors.password}</p>}
                        </div>

                        <label className="flex items-center gap-2 text-sm text-slate-400">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="rounded border-slate-700 bg-slate-950 text-sky-500"
                            />
                            Remember me
                        </label>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-sky-500 py-2.5 text-sm font-semibold text-slate-950 hover:bg-sky-400 disabled:opacity-50"
                        >
                            {processing ? 'Signing in...' : 'Log in'}
                        </button>
                    </form>

                    <div className="mt-6 border-t border-slate-800 pt-4 text-center text-xs text-slate-400">
                        Need a shop or carrier account?{' '}
                        <Link href="/register" className="font-semibold text-sky-400 hover:underline">
                            Register here
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
