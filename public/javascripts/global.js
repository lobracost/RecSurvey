let progress;
console.log(progress)

URL = window.URL || window.webkitURL;
var gumStream;
//stream from getUserMedia() 
var rec;
//Recorder.js object 
var input;
//MediaStreamAudioSourceNode we'll be recording 
// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext;
//new audio context to help us record 
var recordButton1 = document.getElementById("recordButton1");
var stopButton1 = document.getElementById("stopButton1");
var pauseButton1 = document.getElementById("pauseButton1");
var recordingsList1 = document.getElementById("recordingsList1");

var recordButton2 = document.getElementById("recordButton2");
var stopButton2 = document.getElementById("stopButton2");
var pauseButton2 = document.getElementById("pauseButton2");
var recordingsList2 = document.getElementById("recordingsList2");

var recordButton3 = document.getElementById("recordButton3");
var stopButton3 = document.getElementById("stopButton3");
var pauseButton3 = document.getElementById("pauseButton3");
var recordingsList3 = document.getElementById("recordingsList3");

//add events to those 3 buttons 
recordButton1.addEventListener("click", startRecording);
stopButton1.addEventListener("click", stopRecording);
pauseButton1.addEventListener("click", pauseRecording);

recordButton2.addEventListener("click", startRecording);
stopButton2.addEventListener("click", stopRecording);
pauseButton2.addEventListener("click", pauseRecording);

recordButton3.addEventListener("click", startRecording);
stopButton3.addEventListener("click", stopRecording);
pauseButton3.addEventListener("click", pauseRecording);



// Get the modal
var infoModal = document.getElementById("infoModal");
var modal1 = document.getElementById("modal1");
var modal2 = document.getElementById("modal2");
var modal3 = document.getElementById("modal3");

// Get the button that opens the modal
var start = document.getElementById("start");
var next1 = document.getElementById("next1");
var next2 = document.getElementById("next2");
var next3 = document.getElementById("next3");
var submit = document.getElementById("submit");



// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal

start.addEventListener("click", startSurvey)

next1.addEventListener("click", endInfo)

next2.addEventListener("click", endFirst)

next3.addEventListener("click", endSecond)

submit.addEventListener("click", endSurvey)

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    infoModal.style.display = "none";
    modal1.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        infoModal.style.display = "none";
        modal1.style.display = "none";
    }
}


function startSurvey() {
    if (progress == undefined) {
        progress = 1
        start.style.display = "none"
        infoModal.style.display = "block";
        modal1.style.display = "none";
        modal2.style.display = "none";
        modal3.style.display = "none";
        console.log(1);
    }
}

function endInfo() {
    if (progress == 1) {
        progress = 2
        console.log(2);
        start.style.display = "none"
        infoModal.style.display = "none";
        modal1.style.display = "block";
        modal2.style.display = "none";
        modal3.style.display = "none";
    }
}


function endFirst() {
    if (progress == 2) {
        progress = 3
        console.log(3);
        start.style.display = "none"
        infoModal.style.display = "none";
        modal1.style.display = "none";
        modal2.style.display = "block";
        modal3.style.display = "none";
    }
}


function endSecond() {
    if (progress == 3) {
        progress = 4
        console.log(4);
        start.style.display = "none"
        infoModal.style.display = "none";
        modal1.style.display = "none";
        modal2.style.display = "none";
        modal3.style.display = "block";
    }
}

function endSurvey() {
    if (progress == 4) {
        progress = 5
        console.log(4);
        start.style.display = "none"
        infoModal.style.display = "none";
        modal1.style.display = "none";
        modal2.style.display = "none";
        modal3.style.display = "none";
    }
}

function startRecording() {

    /* Simple constraints object, for more advanced audio features see

    https://addpipe.com/blog/audio-constraints-getusermedia/ */

    var constraints = {
            audio: true,
            video: false
        }
        /* Disable the record button until we get a success or fail from getUserMedia() */

    if (progress == 2) {
        recordButton = recordButton1;
        stopButton = stopButton1;
        pauseButton = pauseButton1;

    } else if (progress == 3) {
        recordButton = recordButton2;
        stopButton = stopButton2;
        pauseButton = pauseButton2;

    } else {
        recordButton = recordButton3;
        stopButton = stopButton3;
        pauseButton = pauseButton3;
    }

    recordButton.disabled = true;
    stopButton.disabled = false;
    pauseButton.disabled = false

    /* We're using the standard promise based getUserMedia()

    https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia */

    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
        /* assign to gumStream for later use */
        gumStream = stream;
        /* use the stream */
        input = audioContext.createMediaStreamSource(stream);
        /* Create the Recorder object and configure to record mono sound (1 channel) Recording 2 channels will double the file size */
        rec = new Recorder(input, {
                numChannels: 1
            })
            //start the recording process 
        rec.record()
        console.log("Recording started");
    }).catch(function(err) {
        //enable the record button if getUserMedia() fails 
        recordButton.disabled = false;
        stopButton.disabled = true;
        pauseButton.disabled = true
    });


}


function pauseRecording() {

    if (progress == 2) {
        pauseButton = pauseButton1;

    } else if (progress == 3) {
        pauseButton = pauseButton2;

    } else {
        pauseButton = pauseButton3;
    }
    console.log("pauseButton clicked rec.recording=", rec.recording);
    if (rec.recording) {
        //pause 
        rec.stop();
        pauseButton.innerHTML = "Resume";
    } else {
        //resume 
        rec.record()
        pauseButton.innerHTML = "Pause";
    }
}


function stopRecording() {

    if (progress == 2) {
        recordButton = recordButton1;
        stopButton = stopButton1;
        pauseButton = pauseButton1;

    } else if (progress == 3) {
        recordButton = recordButton2;
        stopButton = stopButton2;
        pauseButton = pauseButton2;

    } else {
        recordButton = recordButton3;
        stopButton = stopButton3;
        pauseButton = pauseButton3;
    }

    console.log("stopButton clicked");
    //disable the stop button, enable the record too allow for new recordings 
    stopButton.disabled = true;
    recordButton.disabled = false;
    pauseButton.disabled = true;
    //reset button just in case the recording is stopped while paused 
    pauseButton.innerHTML = "Pause";
    //tell the recorder to stop the recording 
    rec.stop(); //stop microphone access 
    gumStream.getAudioTracks()[0].stop();
    //create the wav blob and pass it on to createDownloadLink 
    rec.exportWAV(createDownloadLink);
}

function createDownloadLink(blob) {
    var url = URL.createObjectURL(blob);
    var au = document.createElement('audio');
    var li = document.createElement('li');
    var link = document.createElement('a');
    //add controls to the <audio> element 
    au.controls = true;
    au.src = url;
    //link the a element to the blob 
    link.href = url;
    link.download = new Date().toISOString() + '.wav';
    link.innerHTML = link.download;
    //add the new audio and a elements to the li element 
    li.appendChild(au);
    li.appendChild(link);
    var filename = new Date().toISOString();
    //filename to send to server without extension 
    //upload link 
    var upload = document.createElement('a');
    upload.href = "#";
    upload.innerHTML = "Upload";
    upload.addEventListener("click", function(event) {
        /*
         var xhr = new XMLHttpRequest();
         xhr.onload = function(e) {
             if (this.readyState === 4) {
                 console.log("Server returned: ", e.target.responseText);
             }
         };
         var fd = new FormData();
         fd.append("audio_data", blob, filename);
         xhr.open("POST", "/", true);
         xhr.send(fd);
         */

        var params = {
            audio_data: blob,
            filename: filename
        }

        post("/", params, "post")
    })
    li.appendChild(document.createTextNode(" ")) //add a space in between 
    li.appendChild(upload) //add the upload link to li

    //add the li element to the ordered list 
    if (progress == 2) {
        recordingsList1.appendChild(li);
    } else if (progress == 3) {
        recordingsList2.appendChild(li);
    } else {
        recordingsList3.appendChild(li);
    }

}

function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.
    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            form.appendChild(hiddenField);
        }
    }
    document.body.appendChild(form);
    form.submit();
}