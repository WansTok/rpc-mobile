require('dotenv').config();
const prompt = require('prompt-sync')({sigint: true});
const c = require('chalk');
console.log('Options:\n1=> for Spotify Presence\n2=> for Game Presence\n3=> for Twitch Presence');

/* Presence Requirements*/
const rpc = require('discordrpcgenerator');
const config = require('./config.json');

var num = Number(prompt('Enter a number: '));
while(!(num==1||num==2||num==3))
{
console.log(c.hex('#cc0000')('Invalid Choice'));
num=Number(prompt('Reenter a number: '));
}
console.log(process.env.TOKEN);


if (!process.env.TOKEN) {
  throw new Error('No token specified, please set TOKEN environment variable');
}



const discord = require('discord.js-selfbot-v11');
const fs = require('fs');
const {
  dir
} = require('console');
const {
  isFunction
} = require('util');

// Initializing presences
const client = new discord.Client();
module.exports = client;

if(num==1){
spotify();
}
if(num==2){
game();
}
if(num==3){
twitch();
}

function spotify(){
const rpcGenerator=rpc;
    try {
        client.on('ready', () => {
            const presence = rpcGenerator.createSpotifyRpc(client)
                .setAssetsLargeImage(config.settings.spotify.largeImageKey)
                .setAssetsSmallImage(config.settings.spotify.smallImageKey)
                .setDetails(config.settings.spotify.name)
                .setState(config.settings.spotify.details)
                .setStartTimestamp(Date.now());
             //   .setEndTimestamp(config.settings.spotify.endTimestamp || null);

            client.user.setPresence(presence.toDiscord());

            // Done !
            console.log(c.hex('#800080')('Spotify RPC enabled successfully!'));
            console.log(c.hex('#800080')('Spotify: ' + config.settings.spotify.name));
            console.log(c.hex('#800080')('Status: ' + config.status));

        });
    } catch (err) {
        console.error(err);
    }
}

function game(){
    client.on('ready', () => {
        try {
            rpc.getRpcImage(config.settings.game.applicationID, config.settings.game.largeImageKey).then(image => {
                const presence = new rpc.Rpc()
                    .setName(config.settings.game.name)
                    .setType('PLAYING')
                    .setApplicationId(config.settings.game.applicationID)
                    .setState(config.settings.game.state)
                    .setDetails(config.settings.game.details)
                    .setAssetsLargeImage(config.settings.game.largeImageKey.id || image.id)
                    .setAssetsLargeText(config.settings.game.largeImageText.name || image.name)
                    .setStartTimestamp(config.settings.game.startTimestamp || Date.now())
                    //.setEndTimestamp(config.settings.game.endTimestamp || Date.now());

                client.user.setPresence(presence.toDiscord());
            });
            // Set the status
            if (config.status === 'online' || config.status === 'idle' || config.status === 'dnd') {
                client.user.setStatus(config.status);
            }

            if (config.status === 'offline' || config.status === 'invisible') {
                console.log('Status cant be set to' + config.status + '\nPlease change the status in the config.json file');
            }

            // Done !
            console.log(c.hex('#800080')('Game RPC enabled successfully!'));
            console.log(c.hex('#800080')('Game: ' + config.settings.game.name));
            console.log(c.hex('#800080')('Status: ' + config.status));
            

        } catch (err) {
       
            console.error(err);
        }
    });
}
function twitch(){
    client.on('ready', () => {
        try {
            rpc.getRpcImage(config.settings.twitch.applicationID, config.settings.twitch.largeImageKey).then(image => {
                const presence = new rpc.Rpc()
                    .setName(config.settings.twitch.name)
                    .setType('STREAMING')
                    .setUrl(config.settings.twitch.url)
                    .setApplicationId(config.settings.twitch.applicationID)
                    .setState(config.settings.twitch.state)
                    .setDetails(config.settings.twitch.details)
                    .setAssetsLargeImage(config.settings.twitch.largeImageKey.id || image.id)
                    .setAssetsLargeText(config.settings.twitch.largeImageText || image.name)
                    .setStartTimestamp(config.settings.twitch.startTimestamp || Date.now())
                    .setEndTimestamp(config.settings.twitch.endTimestamp || Date.now());

                client.user.setPresence(presence.toDiscord());
            });

            // Set the status
            if (config.status === 'online' || config.status === 'idle' || config.status === 'dnd') {
                client.user.setStatus(config.status);
            }

            if (config.status === 'offline' || config.status === 'invisible') {
                console.log('Status cant be set to' + config.status + '\nPlease change the status in the config.json file');
            }

            // Done !
            console.log(c.hex('#800080')('Twitch RPC enabled successfully!'));
            console.log(c.hex('#800080')('Twitch: ' + config.settings.twitch.name));
            console.log(c.hex('#800080')('Status: ' + 'streaming icon'));


        } catch (err) {
            console.error(err);
        }
    });
}
// Starting bot
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.sendFile('yniEDd.jpg',{ root: '.' });
  
});

app.listen(3000, () => {
});


// Connection with Token in environment variables
client.login(process.env.TOKEN);