// Load json file

var users = require('./users.json');

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
        } else if ( key == 'age' ) {
            // 0-20, 20-40, 40-60, 60-80, 80-100
            stats[key] = [ new Stats(key + '_0-20'), new Stats(key + '_20-39'), new Stats(key + '_40-59'), new Stats(key + '_60-79'), new Stats(key + '_80+') ];
        } else if ( key == 'children' ) {
            // 0, 1, 2, 3, 4+
            stats[key] = [ new Stats(key + '_0'), new Stats(key + '_1'), new Stats(key + '_2'), new Stats(key + '_3'), new Stats(key + '_4+') ];       
        }
        else { console.log(key) };
        // TODO income & education
    }
    
    return stats;
}

function process_answer( answer, stat ) {
    stat.max = Math.max(stat.max, answer);
    stat.min = Math.min(stat.min, answer);
    stat.total = stat.total + answer;
    stat.count += 1;
}

function process_quality_scores( obj, stats ) {
    // get relevant stats objects
    var age_index = parseInt(obj['userStats']['age'] / 100. * 5.);
    var s_age = stats.age[age];
    var s_married = stats.married[obj['userStats']['married']];
    var s_all = stats.all
    // process the users results
    for ( var key in obj['core_module'] ) {
        if ( !key.endsWith( '_answer' ) ) {
            var answer = obj['core_module'][key];
            process_answer( answer, stats.all[key] );
            
            //process userStat specific stats
            for ( var key2 in obj['userStats'] ) {
                if ( typeof(obj[ 'userStats' ][key2]) == 'boolean' ) {
                    // get relevant stats container to process answer for
                    var stats_container = stats[ key2 ][ 
                                        obj[ 'userStats' ][ key2 ] 
                                        ][key]; 
                    process_answer( answer, stats_container );
                } else if ( key == 'age' ) {
                    // get age index
                    // 0-20, 20-40, 40-60, 60-80, 80-100
                    var age = parseInt(obj[ 'userStats' ][ key2 ] / 100. * 5.);
                    var stats_container = stats[ key2 ][ age ][ key ];
                    process_answer( answer, stats_container );
                } else if ( key == 'children' ) {
                    // get children index
                    // 0, 1, 2, 3, 4+  
                    var childr = Math.min(obj[ 'userStats' ][ key2 ], 4);
                    var stats_container = stats[ key2 ][ childr ][key];
                    process_answer( answer, stats_container );
                }
            }
        }
    }
}

var qstats = genStatsContainer( users );
for ( var key in users ) {
    process_quality_scores( users[key], qstats );
}
console.log(qstats.married);
console.log(qstats.vpro_member);
console.log(qstats.children);
//console.log(qstats.married.avg());
return;

var qs = {
    married : { true: new Stats(), false: new Stats()},
    age : [new Stats(), new Stats(), new Stats(), new Stats(), new Stats()], 
    all : new Stats()
};

var count = 0;
for (var key in users) {
    for ( var key2 in users[key]['core_module'] ) {
        //console.log(users[key]['userStats']['married']);
        if ( !key2.endsWith( '_answer' )) {
            var cA = qs.all[key2];
            var cM = qs.married[users[key]['userStats']['married']][key2];
            var age = parseInt(users[key]['userStats']['age'] / 100. * 5.);
            if (age != 0) console.log("AGE: " + age);
            cAge = qs.age[age][key2];
            
            cA.max = Math.max(cA.max, users[key]['core_module'][key2]);
            cA.min = Math.min(cA.min, users[key]['core_module'][key2]);
            cA.total += users[key]['core_module'][key2];
            cA.count += 1;
            // married or not?
            cM.max = Math.max(cM.max, users[key]['core_module'][key2]);
            cM.min = Math.min(cM.min, users[key]['core_module'][key2]);
            cM.total += users[key]['core_module'][key2];
            cM.count += 1;
            //age
            cAge.max = Math.max(cM.max, users[key]['core_module'][key2]);
            cAge.min = Math.min(cM.min, users[key]['core_module'][key2]);
            cAge.total += users[key]['core_module'][key2];
            cAge.count += 1;
        }
    }    
    count += 1;
}
console.log(Object.keys(users).length)
console.log(count);
//for ( var key in qs ) {
console.log(qs.all);
console.log(qs.all.avg());// = qs.all[key].avg / count;
//}
qs.married[true].avg();
//console.log(qs);
