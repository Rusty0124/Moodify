Moodify 
Spotify songs based on a short list of moods

Setup
#1: Clone repo and open it
#2: Do npm install to get the node_modules
#3: Create .env with
```
SPOTIFY_CLIENT_ID=YOUR CLIENT ID
SPOTIFY_CLIENT_SECRET=YOUR SECRET

```
get them here https://developer.spotify.com/
Login
Go to dashboard ---> create app fill in the required fields and for Redirect URIs just put spotify.com


Run:
node moodMusic.js mood
replace mood with the mood you want to test
If you don't have premium on the spotify account you are using it will give error:
Error fetching music:
Active premium subscription required for the owner of the app. When the subscription status changes, it can take a few hours before requests are allowed again.
