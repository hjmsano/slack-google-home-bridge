require('dotenv').config();
const Botkit = require('botkit');
const request = require('request');
const deviceSettings = require('./device-settings.json');

const controller = Botkit.slackbot({
    debug: false,
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    clientSigningSecret: process.env.SLACK_CLIENT_SIGNING_SECRET,
    scopes: ['bot'],
});

controller.spawn({
    token: process.env.SLACK_TOKEN
}).startRTM(function (error) {
    if (error) {
        throw new Error(error);
    }
});

controller.hears(['.*?'], ['ambient'], function (bot, message) {
    let options = {
        method: 'POST',
        headers: {
            "content-type": "text/plain"
        },
        body: message.text
    };
    if (deviceSettings[message.channel]) {
        options.url = `${process.env.BRIDGE_URL}?target=${encodeURIComponent(deviceSettings[message.channel].device)}&lang=${deviceSettings[message.channel].lang}&voice=${deviceSettings[message.channel].voice}&type=${deviceSettings[message.channel].type}`;
        request(options, (error, response, body) => {
            console.log({
                "error": error,
                "body": body
            });
        });
        // bot.reply(message, 'Transmitted.');
    } else {
        bot.reply(message, 'Nothing to do.');
    }
});