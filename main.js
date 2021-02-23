song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    canvas.position(650, 200)

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotResults);
}

function modelLoaded(){
    console.log("poseNet has been initialized")
}

function gotResults(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score of Left wrist Y = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("X of left wrist = " + leftWristX + "Y of left wrist = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("X of right wrist = " + rightWristX + "Y of right wrist = " + rightWristY);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    strokeWeight(10);
    line(500, 100, 600, 100);
    strokeWeight(1);
    textSize(20);
    text('0.5x', 450, 100);
    
    strokeWeight(1);
    textSize(20);
    text('1x', 450, 200);
    strokeWeight(10);
    line(500, 200, 600, 200);
    
    strokeWeight(1);
    textSize(20);
    text('1.5x', 450, 300);
    strokeWeight(10);
    line(500, 300, 600, 300);
    
    strokeWeight(1);
    textSize(20);
    text('2x', 450, 400);
    strokeWeight(10);
    line(500, 400, 600, 400);
    
    strokeWeight(1);
    textSize(20);
    text('2.5x', 450, 500);
    strokeWeight(10);
    line(500, 500, 600, 500);

    //Volume//

    strokeWeight(10);
    line(0, 100, 100, 100);
    strokeWeight(1);
    textSize(20);
    text('0.2', 110, 100);
    
    strokeWeight(1);
    textSize(20);
    text('0.4', 110, 200);
    strokeWeight(10);
    line(0, 200, 100, 200);
    
    strokeWeight(1);
    textSize(20);
    text('0.6', 110, 300);
    strokeWeight(10);
    line(0, 300, 100, 300);
    
    strokeWeight(1);
    textSize(20);
    text('0.8', 110, 400);
    strokeWeight(10);
    line(0, 400, 100, 400);
    
    strokeWeight(1);
    textSize(20);
    text('1', 110, 500);
    strokeWeight(10);
    line(0, 500, 100, 500);
    
    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);

        if(rightWristY > 0 && rightWristY <= 100){
            document.getElementById("speed").innerHTMl = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if(rightWristY > 100 && rightWristY <= 200){
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if(rightWristY > 200 && rightWristY <= 300){
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if(rightWristY > 300 && rightWristY <= 400){
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        else if(rightWristY > 400 && rightWristY <= 500){
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
    
    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        position_leftwrist = Number(leftWristY);
        removed_decimals = floor(position_leftwrist);
        volume = removed_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}

function play_song(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop_song(){
    song.stop();
}