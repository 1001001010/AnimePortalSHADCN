export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    updated_at: string;
}
export interface ActiveSession {
    id: number;
    user_id: number;
    ip_address: string;
    user_agent: string;
    last_activity: number;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
