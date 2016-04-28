// var Irelia = require('irelia');
// var apiKey = process.env.LOL_API_KEY;

if (Meteor.isServer) {
    Meteor.startup(function () {
        Meteor.settings.lol_api_key = process.env.LOL_API_KEY;
    })
}

