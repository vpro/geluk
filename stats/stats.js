// Load json file

var users = require('./users.json');

function Aaap() {
        this.q_1 = { count: 0, min: 10, max: 0, avg: 0 };
        this.q_2 = { count: 0, min: 10, max: 0, avg: 0 };
        this.q_3 = { count: 0, min: 10, max: 0, avg: 0 };
        this.q_4 = { count: 0, min: 10, max: 0, avg: 0 };
        this.q_5 = { count: 0, min: 10, max: 0, avg: 0 };
};
Aaap.prototype.avg = function() {
    var arr =  [this.q_1, this.q_2, this.q_3, this.q_4, this.q_5];
    for (var key in arr )
    {
        console.log(key);
        arr[key].avg = arr[key].avg / arr[key].count;
    }
};


var qs = {
    married : { true: new Aaap(), false: new Aaap()},
    age : [new Aaap(), new Aaap(), new Aaap(), new Aaap(), new Aaap()], 
    all : new Aaap()
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
            cA.avg += users[key]['core_module'][key2];
            cA.count += 1;
            // married or not?
            cM.max = Math.max(cM.max, users[key]['core_module'][key2]);
            cM.min = Math.min(cM.min, users[key]['core_module'][key2]);
            cM.avg += users[key]['core_module'][key2];
            cM.count += 1;
            //age
            cAge.max = Math.max(cM.max, users[key]['core_module'][key2]);
            cAge.min = Math.min(cM.min, users[key]['core_module'][key2]);
            cAge.avg += users[key]['core_module'][key2];
            cAge.count += 1;
        }
    }    
    count += 1;
}
console.log(Object.keys(users).length)
console.log(count);
//for ( var key in qs ) {
//console.log(qs.all);
    qs.all.avg();// = qs.all[key].avg / count;
//}
qs.married[true].avg();
console.log(qs);
