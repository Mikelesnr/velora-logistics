import { Head, Link, useForm } from '@inertiajs/react';
import { Truck } from 'lucide-react';
import type { FormEvent } from 'react';
import { generateClientUuid } from '@/utils/uuid';

interface RegisterFormData {
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
    owner_type: 'individual' | 'institution';
    organization_name: string;
    shop_name: string;
    branch_name: string;
    is_logistics_carrier: boolean;
}

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<RegisterFormData>({
        id: generateClientUuid(),
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        owner_type: 'institution',
        organization_name: '',
        shop_name: '',
        branch_name: 'Main Hub',
        is_logistics_carrier: false,
    });

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />
            <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
                <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
                    <div className="mb-6 flex items-center gap-2.5">
                        <Truck className="h-7 w-7 text-sky-400" />
                        <div>
                            <h1 className="text-xl font-bold text-white">Create Owner &amp; Shop Workspace</h1>
                            <p className="text-xs text-slate-400">Client UUID: {data.id}</p>
                        </div>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-slate-300">Full Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white"
                                    required
                                />
                                {errors.name && <p className="mt-1 text-xs text-rose-400">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300">Phone</label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white"
                                />
                                {errors.phone && <p className="mt-1 text-xs text-rose-400">{errors.phone}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white"
                                required
                            />
                            {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-slate-300">Owner Entity Type</label>
                                <select
                                    value={data.owner_type}
                                    onChange={(e) =>
                                        setData('owner_type', e.target.value as 'individual' | 'institution')
                                    }
                                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white"
                                >
                                    <option value="individual">Individual Owner</option>
                                    <option value="institution">Institution / Company</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300">Owner / Holding Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. DHL International or John Doe"
                                    value={data.organization_name}
                                    onChange={(e) => setData('organization_name', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white"
                                    required
                                />
                                {errors.organization_name && (
                                    <p className="mt-1 text-xs text-rose-400">{errors.organization_name}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-slate-300">Initial Shop / Brand</label>
                                <input
                                    type="text"
                                    placeholder="e.g. DHL Express"
                                    value={data.shop_name}
                                    onChange={(e) => setData('shop_name', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white"
                                    required
                                />
                                {errors.shop_name && <p className="mt-1 text-xs text-rose-400">{errors.shop_name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300">Primary Branch / Hub</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Harare Airport Hub"
                                    value={data.branch_name}
                                    onChange={(e) => setData('branch_name', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white"
                                    required
                                />
                                {errors.branch_name && <p className="mt-1 text-xs text-rose-400">{errors.branch_name}</p>}
                            </div>
                        </div>

                        <label className="flex items-center gap-2 text-sm text-slate-300">
                            <input
                                type="checkbox"
                                checked={data.is_logistics_carrier}
                                onChange={(e) => setData('is_logistics_carrier', e.target.checked)}
                                className="rounded border-slate-700 bg-slate-950 text-sky-500"
                            />
                            This shop operates its own courier/truck fleet (Logistics Carrier)
                        </label>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-slate-300">Password</label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white"
                                    required
                                />
                                {errors.password && <p className="mt-1 text-xs text-rose-400">{errors.password}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300">Confirm Password</label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-sky-500 py-2.5 text-sm font-semibold text-slate-950 hover:bg-sky-400 disabled:opacity-50"
                        >
                            {processing ? 'Creating workspace...' : 'Register Workspace'}
                        </button>
                    </form>

                    <div className="mt-6 border-t border-slate-800 pt-4 text-center text-xs text-slate-400">
                        Already registered?{' '}
                        <Link href="/login" className="font-semibold text-sky-400 hover:underline">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
