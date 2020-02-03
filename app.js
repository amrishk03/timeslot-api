const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose')

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


const bodyParser = require('body-parser');

//Load middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Load in mongoose model
const { List } = require('./db/models')

/* Route Handlers */

app.get('/lists/:start_time/:end_time', (req, res) => {
    let st_time = req.params.start_time;
    let ed_time = req.params.end_time;
    let fetcharr = [];
    List.find({
        start_time: st_time
    }).then((lists) => {
        for (var i = 0; i < lists.length; i++) {
            fetcharr.push(lists[i]['start_time']);
            fetcharr.push(lists[i]['end_time']);
        }
    });
    List.find({
        end_time: st_time
    }).then((lists) => {
        for (var i = 0; i < lists.length; i++) {
            fetcharr.push(lists[i]['start_time']);
            fetcharr.push(lists[i]['end_time']);
        }
    });

    List.find({
        end_time: ed_time
    }).then((lists) => {
        for (var i = 0; i < lists.length; i++) {
            fetcharr.push(lists[i]['start_time']);
            fetcharr.push(lists[i]['end_time']);
        }
    });

    List.find({
        start_time: ed_time
    }).then((lists) => {
        for (var i = 0; i < lists.length; i++) {
            fetcharr.push(lists[i]['start_time']);
            fetcharr.push(lists[i]['end_time']);
        }
    });

    setTimeout(() => {
        var uniqueAndSorted = [...new Set(fetcharr)].sort()
        var arr = uniqueAndSorted;
        var missing = arr.sort(function (a, b) { return a - b; }).reduce(function (prev, cur, index, array) {
            return prev + Math.max(0, cur - array[Math.abs(index - 1)] - 1);
        }, 0);
        if (missing) {
            res.send({ "status": "400", "statusMsg": "Missing Time Slot" });
        } else {
            res.send({ "start_time": uniqueAndSorted[0], "end_time": uniqueAndSorted[uniqueAndSorted.length - 1] });
        }
    }, 1500);

});

app.post('/lists', (req, res) => {
    // add new record in document , json request body
    let title = req.body.title;
    let start_time = req.body.start_time;
    let end_time = req.body.end_time;

    let newList = new List({
        title,
        start_time,
        end_time
    });
    newList.save().then((listDoc) => {
        res.send(listDoc);
    })
});

app.get('/listAll', (req, res) => {
    List.find().then((listDoc) => {
        res.send(listDoc);
    })
});

app.get('/test', (req, res) => {
    let dt = '2020-01-13 02:00:00';
    let dt1 = Date.parse(dt);
    console.log(dt1);

    //let nedt = new Date(dt1);

    var nedt = new Date(dt1.toLocaleString('en-US', {
        timeZone: "Asia/Kolkata"
    }));

    // then nedt will be 07:00 in Toronto
    // and the diff is 5 hours
    var diff = dt1.getTime() - nedt.getTime();

    // so 12:00 in Toronto is 17:00 UTC
    let condt = new Date(dt1.getTime() + diff);

    console.log(nedt);
    console.log(condt);
});

app.listen(3000, () => {
    console.log("server is listening on port 3000");
});