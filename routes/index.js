var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fs = require('fs');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.post('/', function(req, res) {
    console.log(req.body)
    console.log(req.body.audio_blob);
    get_audio(req, res)
    res.send(200)
});

function get_audio(req, res) {
    blob = req.body.audio_blob;
    filename = req.body.filename;
    /*
    var xhr = new XMLHttpRequest();
    xhr.open('GET', audio_link, true);
    xhr.responseType = 'blob';
    xhr.onload = function(e) {
        if (this.status == 200) {
            var blob = this.response;
            // myBlob is now the blob that the object URL pointed to.
        }
    };
    xhr.send();
    */
    fs.writeFile("recordings/" + filename + ".wav", blob, function(err) {
        if (err) {
            console.log("err", err);
        } else {
            return res.json({ 'status': 'success' });
        }
    });

}

function blobToFile(theBlob, fileName) {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}

module.exports = router;