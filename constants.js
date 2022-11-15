require("dotenv").config();
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const auth = {
  type: "OAuth2",
  user: "",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
}

const oAuth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);

oAuth2Client.setCredentials({refresh_token: 
  process.env.REFRESH_TOKEN
});

module.exports = {
  oAuth2Client, 
}

console.log('testing the credentials in constants')