export interface User {
    id: number;
    name: string;
    unix: number;
    email: string;
    is_admin: number;
    email_verified_at: string;
    profile_image: string;
    regist_method: string;
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

export interface Ratings {
    rating: number | string;
}

export interface Favourite {
    id: number;
    user_id: number;
    anime_id: number;
    anime: Anime;
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
    episodes: Episode[];
}

export interface Episode {
    id: number;
    number: number;
    video: string;
    season: Season;
    seasonNumber?: number;
    episode: {
        number: number;
    };
}

export interface Analytics {
    registrationMethod: {
        yandex: number;
        form: number;
        text: string;
    };
    registration: {
        yandex: { [key: string]: number };
        default: { [key: string]: number };
    };
    popularList: {
        anime_id: Anime;
        views_count: number;
    };
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
