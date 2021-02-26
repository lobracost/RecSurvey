let progress; 

console.log(progress);

var info = {};

var gumStream;
//stream from getUserMedia() 
var recorder;
//WebAudioRecorder object 
var input;
//MediaStreamAudioSourceNode we'll be recording var encodingType; 
//holds selected encoding for resulting audio (file) 
var encodeAfterRecord = true;
// when to encode 

//const audioContext = new AudioContext();
var number_of_text;

//new audio context to help us record 
var recordButton1 = document.getElementById("recordButton1");
var stopButton1 = document.getElementById("stopButton1");
var recordingsList1 = document.getElementById("recordingsList1");


//add events to those 3 buttons 
recordButton1.addEventListener("click", startRecording);
stopButton1.addEventListener("click", stopRecording);


// Get the modal
var instruction = document.getElementById("instruction");
var infoModal = document.getElementById("infoModal");
var modal1 = document.getElementById("modal1");


// Get the button that opens the modal
var inbutton = document.getElementById("inbutton");
var demog = document.getElementById("demog");
var startrec = document.getElementById("startrec");
var next2 = document.getElementById("next2");

stopButton1.disabled = true;
//next2.disabled = true;


//Get the button that submits the demographic info
var submit = document.getElementById("submit");


// Get the <span> element that closes the modal
var span1 = document.getElementsByClassName("close1")[0];
//var span2 = document.getElementsByClassName("close2")[0]; 

// When the user clicks on the button, open the modal
inbutton.addEventListener("click",inst);

demog.addEventListener("click", startSurvey);


//startrec.addEventListener("click", function(event) { get('/texts')})

startrec.addEventListener("click", startFirst);

/*startrec.addEventListener("click", get("/texts"))*/

next2.addEventListener("click", next_text);

//When the user clicks in sumbimmitin demographic info 
submit.addEventListener("click",submiting);


// When the user clicks on <span> (x), close the modal
span1.onclick = function() {
    instruction.style.display = "none";
    /*inbutton.style.display ="block";*/ 
    infoModal.style.display = "none";
    modal1.style.display = "none";
};
/*
span2.onclick = function() {
    infoModal.style.display = "none";
    modal1.style.display = "none";
}
*/ 

function inst(){
    instruction.style.display = "block";
    infoModal.style.display = "none";
    modal1.style.display = "none";
    console.log(1);
}


function startSurvey() {
    if (progress == undefined) {

        infoModal.style.display = "block";
        modal1.style.display = "none";
        console.log(1);
    }
}



function submiting(){ 
    var name =  document.getElementById('name'); 
    var gender = document.getElementById('gender'); 
    var age    = document.getElementById('age');
    var english_fluency = document.getElementById('english_fluency');
    var english_frequency = document.getElementById('english_frequency');
    var anxiety =  document.getElementById('anxiety'); 
    var introvert =  document.getElementById('introvert'); 
    var humor =  document.getElementById('humor'); 
    var argue =  document.getElementById('argue'); 
    var conflicts =  document.getElementById('conflicts'); 
    info["name"] = name.value; 
    info["gender"] = gender.value; 
    info["age"] = age.value;
    info["english_fluency"] = english_fluency.value;
    info["english_frequency"] = english_frequency.value;
    info["anxiety"] = anxiety.value; 
    info["introvert"] = introvert.value; 
    info["humor"] = humor.value;  
    info["argue"] = argue.value; 
    info["conflicts"] = conflicts.value; 
    console.log(info); 
    submit.disabled = true; 
    instruction.style.display = "none";
    infoModal.style.display = "none";
    modal1.style.display = "none";
    
    progress = 1;
    
} 

function startFirst() {
    if (progress == 1) {
        get('/texts');
        infoModal.style.display = "none"; 
        modal1.style.display = "block";
    }
}

function next_text(){ 
    //modal1.style.display = "block";
    while (recordingsList1.firstChild) {
        recordingsList1.removeChild(recordingsList1.lastChild);
    }
    //recordingsList1.removeChild(li);
    get('/texts');
    //next2.disabled = true;
    //infoModal.style.display = "none"; 
    //
}

function startRecording() {

    /* Simple constraints object, for more advanced audio features see

    https://addpipe.com/blog/audio-constraints-getusermedia/ */
    /* Disable the record button until we get a success or fail from getUserMedia() */

    recordButton = recordButton1;
    stopButton = stopButton1;

    recordButton.disabled = true;
    stopButton.disabled = false;

    /*-----------------*/
    
    var constraints = {
            audio: {
                volume: 1.0,
            },
            video: false
    };
    
        /* We're using the standard promise based getUserMedia() https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia */
    navigator.mediaDevices.getUserMedia(constraints).then(
        function(stream) {
            console.log("getUserMedia() success, stream created, initializing WebAudioRecorder...");
            //assign to gumStream for later use 
            gumStream = stream;
            /* use the stream */ 
            var audioContext = new AudioContext();
            input = audioContext.createMediaStreamSource(stream);
            //stop the input from playing back through the speakers 
            //input.connect(audioContext.destination)
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
            };
            recorder.setOptions({
                timeLimit: 600,
                encodeAfterRecord: encodeAfterRecord,
            });
            //start the recording process 
            recorder.startRecording();
            console.log("Recording started");
        }).catch(function(err) { //enable the record button if getUSerMedia() fails 
    });

}



function stopRecording() {

    recordButton = recordButton1;
    stopButton = stopButton1;


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
    var filename = number_of_text + "_" + info.name + "_" + info.gender + "_"+ info.age + "_" + info.english_fluency + "_" + info.english_frequency + "_" + info.anxiety + "_" + info.introvert + "_" + info.humor + "_" + info.argue + "_" + info.conflicts + "_" + date;

        //filename to send to server without extension 
        //upload link 
    var upload = document.createElement('a');
    upload.href = "#";
    upload.innerHTML = "Upload";
    upload.addEventListener("click", function(event) {

        var params = {
            audio_blob: blob,
            filename: filename
        };

        post("/", params, "post", true);

        //next2.disabled = false;
    });
    li.appendChild(document.createTextNode(" ")); //add a space in between 
    li.appendChild(upload); //add the upload link to li

    //add the li element to the ordered list 
    recordingsList1.appendChild(li);
}

function post(path, params, method) {
    var fd = new FormData();
    fd.append('filename', params.filename);
    fd.append('audio_blob', params.audio_blob);
    console.log(fd.get("audio_blob"));
    console.log(fd.get("filename"));
    $.ajax({
        type: 'POST',
        url: path,
        data: fd,
        processData: false,
        contentType: false
    }).done(function(data) {
        console.log(data);
    });
} 


function get(url_to_text){ 
    $.ajax({ 
        type: 'GET',
        dataType : "json",
        url: url_to_text, 
        processData: false,
        contentType: false
    }).done(function(content) {
                // show the corresponding text 
                number_of_text = content.int;
                $('#trivia').text(content.data); 
                console.log(content);
           });
}

