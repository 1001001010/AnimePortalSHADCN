export interface User {
    id: number;
    name: string;
    email: string;
    profile_image: string;
    created_at: string;
    updated_at: string;
}
export interface ActiveSession {
    id: string;
    user_id: number;
    ip_address: string;
    user_agent: string;
    last_activity: number;
    payload: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
