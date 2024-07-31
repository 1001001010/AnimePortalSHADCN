export interface User {
    id: number;
    name: string;
    email: string;
    is_admin: number;
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
export interface FriendShips {
    id: number;
    user_id: number;
    friend_id: number;
}

export interface Anime {
    id: number;
    age: string;
    status: string;
    name: string;
    type: string;
    original: string;
    studio: string;
    voice: string;
    director: string;
    autor: string;
    description: string;
    grade: number;
    cover: string;
    unix: number;
    screens: string;
}

export interface Season {
    id: number;
    name: string;
    number: number;
    episodes: { id: number; name: string }[];
}

export interface Episode {
    id: number;
    name: string;
}

export interface AnimePageProps {
    Anime: Anime;
    seasons: Season[];
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
