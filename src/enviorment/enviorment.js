const CURRENT_ENVIORMENT = process.env.REACT_APP_NODE_ENV;


const COMMON_ENVIORMENT = {
    SPOTIFY_AUTH_BASE_URL: process.env.REACT_APP_SPOTIFY_AUTH_BASE_URL,
    SONGSTATE_BASE_URL: process.env.REACT_APP_SONGSTATE_BASE_URL,
    SPOTIFY_CLIENT_BASE_URL: process.env.REACT_APP_SPOTIFY_CLIENT_BASE_URL,
    SPOTIFY_CLIENT_ID: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRETS: process.env.REACT_APP_SPOTIFY_CLIENT_SECRETS,
    SONGS_STATS_API_KEY: process.env.REACT_APP_SONGS_STATS_API_KEY,
    YOUTUBE_KEY: process.env.REACT_APP_YOUTUBE_ACCESS_KEY,
    SONG_STATE_API: process.env.REACT_APP_API_SONG_STATE_ARTIST_API,
    CHARMETRIC_ACCESS_TOKEN: process.env.REACT_APP_CHARMETRIC_ACCESS_TOKEN
}


const enviorment = {
    local: {
        BASE_URL: process.env.REACT_APP_BACKEND_API,
        CURRENT_HOST: process.env.REACT_APP_CURRENT_HOST,
        ...COMMON_ENVIORMENT
    },
    development: {
        BASE_URL: process.env.REACT_APP_BACKEND_API,
        CURRENT_HOST: process.env.REACT_APP_CURRENT_HOST,
        ...COMMON_ENVIORMENT
    },
    staging: {
        BASE_URL: process.env.REACT_APP_BACKEND_API,
        CURRENT_HOST: process.env.REACT_APP_CURRENT_HOST,
        ...COMMON_ENVIORMENT

    },
    production: {
        BASE_URL: process.env.REACT_APP_BACKEND_API,
        CURRENT_HOST: process.env.REACT_APP_CURRENT_HOST,
        ...COMMON_ENVIORMENT
    }
};


const config = enviorment[CURRENT_ENVIORMENT];


export { config };