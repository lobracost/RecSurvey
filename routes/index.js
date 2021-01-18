var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var formidable = require('formidable');
var util = require('util')
var fs = require('fs');
var express = require('express');
var router = express.Router();

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
    fs.rename(audio_blob.path, "recordings/" + filename + ".wav", function(err) {
        if (err) {
            console.log("err", err);
        } else {
            console.log('Audio file saved successfully')
        }
    });

}

module.exports = router;