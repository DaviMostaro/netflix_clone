export interface Movie {
    id: number;
    title?: string;
    original_title?: string;
    name?: string;
    original_name?: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    vote_average: number;
    first_air_date?: string;
    release_date?: string;
    genres?: { id: number; name: string }[];
}

export interface Category {
    slug: string;
    title: string;
    items: {
        results: Movie[];
    };
}

export interface FeaturedData extends Movie {
    number_of_seasons?: number;
    runtime?: number;
}