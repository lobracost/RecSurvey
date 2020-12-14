var fs = require('fs');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.post('/', function(req, res) {
    console.log(req.body.audio_data);
    audio_blob = req.body.audio_data;
    filename = req.body.filename
    var file = blobToFile(audio_blob, filename)
    fs.writeFile("recordings/" + filename + ".wav", file, function(err) {
        if (err) {
            console.log("err", err);
        } else {
            return res.json({ 'status': 'success' });
        }
    });

});

function blobToFile(theBlob, fileName) {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}

module.exports = router;