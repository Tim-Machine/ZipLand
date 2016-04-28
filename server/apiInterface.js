var league_api = require('league-api');
var league = new league_api(process.env.LOL_API_KEY);


Meteor.methods({

    findSummoner: function(summonerName, region) {
        check(summonerName, String);
        check(region, String);
        console.log(summonerName);
        var res = Meteor.wrapAsync(function(done) {
            league.getSummonersByName(region, summonerName, function(err, res) {
                // http error
                if (err !== null) {
                    return done(new Meteor.Error(err.error));
                }
                // no summoner Found
                if (res.status !== null) {
                    return done(new Meteor.Error('Summoner not found'));
                }

                upsertSummoner(res[summonerName]);
                return res[summonerName];
            })
        });

        return res();
    }
});


var upsertSummoner = function(summonerData) {
    console.log(summonerData);

    Summoner.upsert({
        id: summonerData.id
    }, {
        $set: {
            summonerData

        }
    });


}