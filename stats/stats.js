// Load json file
const https = require('https');
const fs = require('fs');
var users={};
var persona = require('../src/components/config/persona.json');

function Stats( name ) {
        this.name = name;
        this.q_1 = { count: 0, min: 10, max: 0, total: 0 };
        this.q_2 = { count: 0, min: 10, max: 0, total: 0 };
        this.q_3 = { count: 0, min: 10, max: 0, total: 0 };
        this.q_4 = { count: 0, min: 10, max: 0, total: 0 };
        this.q_5 = { count: 0, min: 10, max: 0, total: 0 };
};
Stats.prototype.avg = function( key ) {
    if ( key === undefined ) {
        ret = [];
        [this.q_1, this.q_2, this.q_3, this.q_4, this.q_5].forEach( function(item) {
            ret.push(item.total/item.count);
        });
        return ret;
    } else {
        return this[key].total/this[key].count;
    }
};

function genStatsContainer( obj ) {
    // generate stats container
    var stats = { all : new Stats() };
    var first = Object.keys(users)[0]
    for ( var key in obj[first][ 'userStats' ] ) {
        if ( typeof(obj[first][ 'userStats' ][key]) == 'boolean' ) {
            stats[key] = { true: new Stats(key +'_true'), false: new Stats(key +'_false') };
        // JOB 
        } else if ( key == 'job' ) {
            if (!( key in stats )) stats[key] = {};
            for ( job in persona.job )
            {
                stats[key][ persona.job[job].cat ] = new Stats( persona.job[job].naam );
            }
        // INCOME
        } else if ( key == 'income' ) {
            if (!( key in stats )) stats[key] = {};
            for ( inc in persona.income )
            {
                stats[key][ persona.income[inc].cat ] = new Stats( persona.income[inc].naam );
            }
        // AGE
        } else if ( key == 'age' ) {
            if (!( key in stats )) stats[key] = {};
            for ( age in persona.age )
            {
                stats[key][ persona.age[age].cat ] = new Stats( persona.age[age].naam );
            }
        // EDUCATION
        } else if ( key == 'education' ) {
            ['geen', 'basisschool', 'middelbareschool', 'mbo', 'mbo', 'hbo', 'wo' ].forEach( function( name ) {
                if (!( key in stats )) stats[key] = {};
                stats[key][name] = new Stats(name);
            });
        // GENDER
        } else if ( key == 'gender' ) {
            stats[key] = { 'male': new Stats("male"), 'female': new Stats("female") };
        // AGE
        } else if ( key == 'age2' ) {
            // 0-20, 20-40, 40-60, 60-80, 80-100
            stats[key] = [ new Stats(key + '_0-20'), new Stats(key + '_20-39'), new Stats(key + '_40-59'), new Stats(key + '_60-79'), new Stats(key + '_80+') ];
        // CHILDREN (deprecated)
        } else if ( key == 'children' ) {
            // 0, 1, 2, 3, 4+
            stats[key] = [ new Stats(key + '_0'), new Stats(key + '_1'), new Stats(key + '_2'), new Stats(key + '_3'), new Stats(key + '_4+') ];
        // INCOME
        } else if ( key == 'income' ) {
            // 0-20, 20-40, 40-60, 60-80, 80-100
            stats[key] = [ new Stats(key + '_1000'), new Stats(key + '_2000'), new Stats(key + '_3000'), new Stats(key + '_4000'), new Stats(key + '_5000'), new Stats(key + '_6000') ];
        } else { console.log(key) };
    }
    
    return stats;
}

function process_answer( answer, stat ) {
    stat.max = Math.max(stat.max, answer);
    stat.min = Math.min(stat.min, answer);
    stat.total = stat.total + answer;
    stat.count += 1;
}

function isValidReponse( response ) {
    try {
        if ( response.userStats.score == 0 ) {
            return false;
        }
        if ( typeof(response.userStats.score) === 'object' ) return false;
        return true;
    }
    catch(err) {
        return false;
    }
}

function process_quality_scores( obj, stats ) {
    if ( !isValidReponse(obj) ) return;
    // get relevant stats objects
    var age_index = parseInt(obj['userStats']['age'] / 100. * 5.);
    var s_age = stats.age[age];
    //var s_married = stats.married[obj['userStats']['married']];
    var s_all = stats.all
    // process the users results
    for ( var key in obj['core_module'] ) {
        if ( !key.endsWith( '_answer') ) {
            var answer = obj['core_module'][key];
            process_answer( answer, stats.all[key] );
            
            //process userStat specific stats
            for ( var key2 in obj['userStats'] ) {
                console.log( key, key2);
                if ( typeof(obj[ 'userStats' ][key2]) == 'boolean' ) {
                    // get relevant stats container to process answer for
                    if ( key2 in stats ) {
                        var stats_container = stats[ key2 ][ 
                                        obj[ 'userStats' ][ key2 ] 
                                        ][key];
                    } else {
                        console.log("WARN: "+ key2 +"not in stats");
                    }
                    process_answer( answer, stats_container );
                } else if ( key2 == 'age2' ) {
                    // get age index
                    // 0-20, 20-40, 40-60, 60-80, 80-100
                    var age = parseInt(obj[ 'userStats' ][ key2 ] / 100. * 5.);
                    var stats_container = stats[ key2 ][ age ][ key ];
                    process_answer( answer, stats_container );
                } else if ( key2 == 'score' ) { //do nothing
                } else if ( key2 == 'children' ) {
                    // get children index
                    // 0, 1, 2, 3, 4+  
                    var childr = Math.min(obj[ 'userStats' ][ key2 ], 4);
                    var stats_container = stats[ key2 ][ childr ][key];
                    process_answer( answer, stats_container );
                } else if ( key2 == 'gender' ) {
                    var gender = obj['userStats'][ key2 ];
                    console.log(obj['userStats']);
                    var stats_container = stats[ key2 ][ gender ][key];
                    process_answer( answer, stats_container );
                } else {
                    var item = obj['userStats'][ key2 ];
                    console.log(item, obj['userStats']);
                    var stats_container = stats[ key2 ][ item ][key];
                    process_answer( answer, stats_container );
                }
            }
        }
    }
}

function writeJson( obj ) {
    fs.writeFile("./stats.json", JSON.stringify( obj ), function ( err ) {
        if (err) {
            console.log( 'Error saving file:', err );
        } else {
            console.log( 'stats.json was saved' );
        }
    });
}

function parse() {
    var qstats = genStatsContainer( users );
    for ( var key in users ) {
        process_quality_scores( users[key], qstats );
    }
    writeJson( qstats );
    return;
}


https.get('https://geluk.firebaseio.com/users.json', function(res) {
    var body = '';
    res.on('data', function(chunk) {
        body+= chunk;
    });
    
    res.on('end', function() {
        users = JSON.parse(body);
        console.log("Got " + Object.keys(users).length + " responses from firebase");
        parse();
    });
}).on('error', function(e) {
    console.log("Got an error acquiring data from firebase:", e);
    users = require('./users.json');
});
/*
users = require('./users.json');
parse();
*/
