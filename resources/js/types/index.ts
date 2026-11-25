export type UserRoleValue =
    | 'system_admin'
    | 'system_staff'
    | 'system_accountant'
    | 'system_it_support'
    | 'owner'
    | 'manager'
    | 'branch_supervisor'
    | 'storefront_staff'
    | 'warehouse_staff'
    | 'driver';

export interface RoleOption {
    value: UserRoleValue;
    label: string;
    scope: 'system' | 'shop' | string;
}

export interface OwnerEntitySummary {
    id: string;
    name: string;
    type: 'individual' | 'institution' | string;
}

export interface ShopSummary {
    id: string;
    name: string;
    slug: string;
    is_logistics_carrier?: boolean;
}

export interface BranchSummary {
    id: string;
    shop_id?: string;
    name: string;
    code?: string | null;
    branch_type: string;
    city?: string | null;
}

export interface MembershipRecord {
    id: string;
    user_id: string;
    owner_entity_id: string | null;
    shop_id: string | null;
    branch_id: string | null;
    role: UserRoleValue;
    is_active: boolean;
    owner_entity?: OwnerEntitySummary | null;
    shop?: ShopSummary | null;
    branch?: BranchSummary | null;
}

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    role: UserRoleValue;
    role_label: string;
    role_scope: 'system' | 'shop' | string;
    memberships: MembershipRecord[];
}

export interface ManagedUser {
    id: string;
    name: string;
    email: string;
    role: UserRoleValue;
    is_active: boolean;
    created_at: string;
}

export interface ShopWithBranches {
    id: string;
    name: string;
    slug: string;
    code?: string | null;
    category: string;
    is_logistics_carrier: boolean;
    brand_primary_color: string;
    owner_entity?: OwnerEntitySummary | null;
    branches: BranchSummary[];
}

export interface DashboardStats {
    users_count: number;
    owner_entities_count: number;
    shops_count: number;
    branches_count: number;
}

export interface PageProps {
    auth: {
        user: AuthUser | null;
    };
    roles: RoleOption[];
    flash: {
        status?: string | null;
        error?: string | null;
    };
    ziggy?: {
        location: string;
        [key: string]: unknown;
    };
    [key: string]: unknown;
}
