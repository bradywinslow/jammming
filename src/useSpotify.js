/*
Authorization through Implicit Grant Flow:
https://developer.spotify.com/documentation/web-api/tutorials/implicit-flow

https://www.newline.co/@kchan/writing-a-custom-react-hook-for-spotifys-web-api-implicit-grant-flow--25967253

https://joekarlsson.com/2019/04/how-to-build-a-spotify-player-with-react-in-15-minutes/
*/


const CLIENT_ID = 'c73c8dd43ae64b7c82a1e3b355cda443';
const REDIRECT_URI = 'http://localhost:3000';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const scope = 'user-read-private user-read-email';

/* 
const state = generateRandomString(16);

localStorage.setItem(stateKey, state);
const scope = 'user-read-private user-read-email';

let url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
url += '&state=' + encodeURIComponent(state);


async function getProfile(accessToken) {
    let accessToken = localStorage.getItem('access_token');
  
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
  
    const data = await response.json();
  }
*/
