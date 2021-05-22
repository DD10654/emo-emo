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