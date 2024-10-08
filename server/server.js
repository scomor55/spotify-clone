require('dotenv').config();
const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express();
app.use(cors())
app.use(bodyParser.json())


app.post('/refresh',(req,res)=>{
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId:  process.env.CLIENT_ID,
        clientSecret:  process.env.CLIENT_SECRET,
        refreshToken: refreshToken
    });

    spotifyApi.refreshAccessToken().then(
        data => {
           // console.log(data)
            res.json({
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in

            })
        }).catch((err) => {
       //     console.log(err)
            res.sendStatus(400)
        })
     
    
})

app.post('/login', (req, res) => {
    const code = req.body.code;
   // console.log("----------------> ",code)
    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId:  process.env.CLIENT_ID,
        clientSecret:  process.env.CLIENT_SECRET
    });

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        });
    }).catch((err) => {
      //  console.log(err)
        res.sendStatus(400)
    });
});

app.listen(3001)