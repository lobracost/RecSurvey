let progress;
console.log(progress)

var info = {}

var gumStream;
//stream from getUserMedia() 
var recorder;
//WebAudioRecorder object 
var input;
//MediaStreamAudioSourceNode we'll be recording var encodingType; 
//holds selected encoding for resulting audio (file) 
var encodeAfterRecord = true;
// when to encode 
var audioContext;


//new audio context to help us record 
var recordButton1 = document.getElementById("recordButton1");
var stopButton1 = document.getElementById("stopButton1");
var recordingsList1 = document.getElementById("recordingsList1");

var recordButton2 = document.getElementById("recordButton2");
var stopButton2 = document.getElementById("stopButton2");
var recordingsList2 = document.getElementById("recordingsList2");

var recordButton3 = document.getElementById("recordButton3");
var stopButton3 = document.getElementById("stopButton3");
var recordingsList3 = document.getElementById("recordingsList3");

//add events to those 3 buttons 
recordButton1.addEventListener("click", startRecording);
stopButton1.addEventListener("click", stopRecording);

recordButton2.addEventListener("click", startRecording);
stopButton2.addEventListener("click", stopRecording);

recordButton3.addEventListener("click", startRecording);
stopButton3.addEventListener("click", stopRecording);


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
var finish = document.getElementById("finish");

next2.disabled = true;
next3.disabled = true;
finish.disabled = true;


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal

start.addEventListener("click", startSurvey)

next1.addEventListener("click", endInfo)

next2.addEventListener("click", endFirst)

next3.addEventListener("click", endSecond)

finish.addEventListener("click", endSurvey)

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    infoModal.style.display = "none";
    modal1.style.display = "none";
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

    var gender = document.getElementById('gender');
    var english_fluency = document.getElementById('english_fluency');
    var english_frequency = document.getElementById('english_frequency');
    info["gender"] = gender.value;
    info["english_fluency"] = english_fluency.value;
    info["english_frequency"] = english_frequency.value;
    console.log(info);
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
    /* Disable the record button until we get a success or fail from getUserMedia() */

    if (progress == 2) {
        recordButton = recordButton1;
        stopButton = stopButton1;

    } else if (progress == 3) {
        recordButton = recordButton2;
        stopButton = stopButton2;

    } else {
        recordButton = recordButton3;
        stopButton = stopButton3;
    }

    recordButton.disabled = true;
    stopButton.disabled = false;

    /*-----------------*/

    var constraints = {
            audio: true,
            video: false
        }
        /* We're using the standard promise based getUserMedia() https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia */
    navigator.mediaDevices.getUserMedia(constraints).then(
        function(stream) {
            console.log("getUserMedia() success, stream created, initializing WebAudioRecorder...");
            //assign to gumStream for later use 
            gumStream = stream;
            /* use the stream */
            audioContext = new AudioContext
            input = audioContext.createMediaStreamSource(stream);
            //stop the input from playing back through the speakers 
            input.connect(audioContext.destination)
                //get the encoding 
            encodingType = "wav";
            //disable the encoding selector 
            recorder = new WebAudioRecorder(input, {
                encoding: encodingType,
                onEncoderLoading: function(recorder, encoding) {
                    // show "loading encoder..." display 
                    console.log("Loading " + encoding + " encoder...");
                },
                onEncoderLoaded: function(recorder, encoding) {
                    // hide "loading encoder..." display 
                    console.log(encoding + " encoder loaded");
                }
            });
            recorder.onComplete = function(recorder, blob) {
                gumStream.getAudioTracks()[0].stop();
                console.log("Encoding complete");
                createDownloadLink(blob);
            }
            recorder.setOptions({
                timeLimit: 120,
                encodeAfterRecord: encodeAfterRecord,
                ogg: {
                    quality: 0.5
                },
                mp3: {
                    bitRate: 160
                }
            });
            //start the recording process 
            recorder.startRecording();
            console.log("Recording started");
        }).catch(function(err) { //enable the record button if getUSerMedia() fails 
    });

}



function stopRecording() {

    if (progress == 2) {
        recordButton = recordButton1;
        stopButton = stopButton1;

    } else if (progress == 3) {
        recordButton = recordButton2;
        stopButton = stopButton2;

    } else {
        recordButton = recordButton3;
        stopButton = stopButton3;
    }

    console.log("stopRecording() called");
    //stop microphone access 
    gumStream.getAudioTracks()[0].stop();
    //disable the stop button 
    stopButton.disabled = true;
    recordButton.disabled = false;
    //tell the recorder to finish the recording (stop recording + encode the recorded audio) 
    recorder.finishRecording();
    console.log('Recording stopped');
}

function createDownloadLink(blob) {

    var url = URL.createObjectURL(blob);
    var au = document.createElement('audio');
    var li = document.createElement('li');
    var link = document.createElement('a');
    //add controls to the "audio" element 
    au.controls = true;
    au.src = url; //link the a element to the blob 
    link.href = url;
    link.download = new Date().toISOString() + 'wav';
    link.innerHTML = link.download;
    //add the new audio and a elements to the li element 
    li.appendChild(au);
    li.appendChild(link); //add the li element to the ordered list 

    var date = new Date().toISOString();
    var filename = (progress - 1).toString() + "_" + info.gender + "_" + info.english_fluency + "_" + info.english_frequency + "_" + date
        //filename to send to server without extension 
        //upload link 
    var upload = document.createElement('a');
    upload.href = "#";
    upload.innerHTML = "Upload";
    upload.addEventListener("click", function(event) {

        var params = {
            audio_blob: blob,
            filename: filename
        }

        post("/", params, "post", true)
        if (progress == 2) {
            next2.disabled = false;
        } else if (progress == 3) {
            next3.disabled = false;
        } else {
            finish.disabled = false;
        }

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
    var fd = new FormData();
    fd.append('filename', params.filename);
    fd.append('audio_blob', params.audio_blob);
    console.log(fd.get("audio_blob"))
    console.log(fd.get("filename"))
    $.ajax({
        type: 'POST',
        url: path,
        data: fd,
        processData: false,
        contentType: false
    }).done(function(data) {
        console.log(data);
    })
}