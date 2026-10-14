import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function getSpotifyAccessToken() {
 const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
                "Basic " +
                Buffer.from(
                    process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
                ).toString("base64"),
                "Content-Type": "application/x-www-form-urlencoded",
            },
    }
 );
 return response.data.access_token;
}

function moodToGenre(mood) {
    const mapping = {
        happy: "pop",
        sad: "acoustic",
        energetic: "workout",
        relaxed: "chill",
        romantic: "love",
        angry: "rock",
        focused: "study",
    };
    return mapping[mood.toLowerCase()] || "pop";
}

async function getSongsByMood(mood) {
    try {
        const token = await getSpotifyAccessToken();
        const genre = moodToGenre(mood);
        const response = await axios.get(
            `https://api.spotify.com/v1/search?q=genre:${genre}&type=track&limit=5`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const tracks = response.data.tracks.items;
        console.log(`\nRecommended songs for mood: ${mood} (${genre})\n`);
        tracks.forEach((track, i) => {
            console.log(
                `${i + 1}. ${track.name} by ${track.artists[0].name}\n
                ${track.external_urls.spotify} \n`
            );
        });
    } catch (error) {
        console.error("\nError fetching music:");
        console.error(error.response?.data || error.message);
    }
}

const mood = process.argv[2];
if (!mood) {
    console.error("Please provide a mood");
    console.log("Example: node moodMusic.js happy\n");
}
else{
    getSongsByMood(mood);
}
