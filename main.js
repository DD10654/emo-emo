//Declairing Variables

var prediction1;
var prediction2;

//Setting The Webcam and Taking The Camera Reference!

Webcam.set(
    {
        width : 350,
        height : 300,
        img_format : "png",
        png_quality : 80
    }
);

camera = document.getElementById("camera");

//Connecting The Webcam!

Webcam.attach(camera);

//Taking The Snapshot and Displaying it!

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='snap' src='" + data_uri + "'>";
    });
}

console.log("ML5 VERSION -", ml5.version);

//Import our Model!

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/pqpTFU4iG/model.json", loaded);

function loaded() {
    console.log("Model Loaded!");
}

//Making our Computer Speak when the result is displayed

function speak() {
    var speech  = window.speechSynthesis;
    speakData1 = "The first prediction is " + prediction1;
    speakData2 = " and the second prediction is " + prediction2;
    var utter = new SpeechSynthesisUtterance(speakData1 + speakData2);
    speech.speak(utter);
}

//Compairing The Image With The Modal And Displaying The Results

function check() {
    img = document.getElementById("snap");
    classifier.classify(img, gotresult);
}

function gotresult(error, result) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(result);
        document.getElementById("resultEmotion1").innerHTML = result[0].label;
        document.getElementById("resultEmotion2").innerHTML = result[1].label;
        prediction1 = result[0].label;
        prediction2 = result[1].label;
        speak();

        if (prediction1 == "Happy") {
            document.getElementById("resultEmoji1").innerHTML = "&#128522;";
        }
        if (prediction1 == "Sad") {
            document.getElementById("resultEmoji1").innerHTML = "&#128532;";
        }
        if (prediction1 == "Angry") {
            document.getElementById("resultEmoji1").innerHTML = "&#128548;";
        }
        if (prediction1 == "Crying") {
            document.getElementById("resultEmoji1").innerHTML = "&#128546;";
        }


        if (prediction2 == "Happy") {
            document.getElementById("resultEmoji2").innerHTML = "&#128522;";
        }
        if (prediction2 == "Sad") {
            document.getElementById("resultEmoji2").innerHTML = "&#128532;";
        }
        if (prediction2 == "Angry") {
            document.getElementById("resultEmoji2").innerHTML = "&#128548;";
        }
        if (prediction2 == "Crying") {
            document.getElementById("resultEmoji2").innerHTML = "&#128546;";
        }
    }
}