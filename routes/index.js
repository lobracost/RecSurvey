var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var formidable = require('formidable');
var util = require('util')
var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();

var mv = require('mv');


/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
});

router.post('/', function(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        res.writeHead(200, { 'content-type': 'image/jpeg' });
        res.write('received upload:\n\n');
        res.end(util.inspect({ fields: fields, files: files }));
        console.log(fields)
        console.log(files)
        get_audio(fields.filename, files.audio_blob)
    });
});

function get_audio(filename, audio_blob) {
    mv(audio_blob.path, "recordings/" + filename + ".wav", function(err) {
        if (err) {
            console.log("err", err);
        } else {
            console.log('Audio file saved successfully')
        }
    });

} 



router.get('/texts', function(req, res) { 
    var integer = randomInt(1,40).toString(); 

    var filePath = 'texts/' + integer + '.txt' ;
    //path.join(__dirname, 'texts/1.txt');
    fs.readFile(filePath,"utf8", function(e, data){
        if (e) {
            console.log("e",e);
        } else { 
            var data = data.toString();
            res.send({"data":data,"int":integer}); 
        } 
    });
});


function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}

module.exports = router;