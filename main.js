Webcam.set({
  width: 350,
  height: 300,
  image_format: "png",
  png_quality: 90,
});

camera = document.getElementById("camera");

Webcam.attach(camera);

function Capture(){
  Webcam.snap(function(data_uri) {
    document.getElementById("webcam").innerHTML=
      '<img id="capture_img" src="' + data_uri + '">';
  });
}
console.log("ml5version", ml5.version);
classifier = ml5.imageClassifier(
  "https://teachablemachine.withgoogle.com/models/G_BUurDWy/model.json", ModelLoaded
);

function modelLoaded(){
  console.log("modelLoaded");
};

function Speak(){
var synth= window.speechSynthesis;
var speakdata1= "The first prediction is "+ prediction1;
var speakdata2= "The second prediction is "+ prediction2;
var utterThis= new SpeechSynthesisUtterance(speakdata1+speakdata2);
utterThis.rate= 0.5;
synth.speak(utterThis);
};

function Result(){
  var img= document.getElementById("capture_img");
  classifier.classify(img,gotResult);
};

function gotResult(error,results){
if(error){
  console.error(error);
}
else{
  console.log(results);
  document.getElementById("result_emotion_name1").innerHTML=results[0].label;
  document.getElementById("result_emotion_name2").innerHTML=results[1].label;
  prediction1= results[0].label;
  prediction2= results[1].label;
  Speak();
  //result 1

  if(results[0].label=="Happy"){
    document.getElementById("update_emoji1").innerHTML="&#128522"
  }
  if(results[0].label=="Sad"){
    document.getElementById("update_emoji1").innerHTML="&#128532"
  }
  if(results[0].label=="Angry"){
    document.getElementById("update_emoji1").innerHTML="&#128548"
  }

//result 2

  if(results[1].label=="Happy"){
    document.getElementById("update_emoji2").innerHTML="&#128522"
  }
  if(results[1].label=="Sad"){
    document.getElementById("update_emoji2").innerHTML="&#128532"
  }
  if(results[1].label=="Angry"){
    document.getElementById("update_emoji2").innerHTML="&#128548"
  }
  }
};
