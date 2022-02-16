harry_potter="";
peter_pan=""; 
current_song="";
song1="";
song2="";
lWx=0;
lWy=0;
rWx=0;
rWy=0;
rWscore=0;
lWscore=0;
function preload()
{
    harry_potter=loadSound("harrypotter.mp3");
    peter_pan=loadSound("peterpan.mp3");
}
function setup()
{
    canvas=createCanvas(600,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded()
{
    console.log("PoseNET ready.");
}
function gotPoses(results,error)
{
    if(error)
    {
        console.error(error);
    }
    if(results.length>0)
    {
        lWy=results[0].pose.leftWrist.y;
        lWx=results[0].pose.leftWrist.x;
        rWx=results[0].pose.rightWrist.x;
        rWy=results[0].pose.rightWrist.y;
        lWscore=results[0].pose.keypoints[9].score;
        rWscore=results[0].pose.keypoints[10].score;
        console.log("LeftWy= "+lWy+" LeftWx= "+lWx+" RightWy= "+rWy+" RightWx= "+rWx);
        console.log("LeftWScore= "+lWscore+" RightWScore= "+rWscore);
    }
}
function draw()
{
    image(video,0,0,600,400);
    song1=harry_potter.isPlaying();
    song2=peter_pan.isPlaying();
    if(rWscore>0.2)
    {
        fill("red");
        circle(rWx,rWy,20,20);
        harry_potter.stop();
        if(song2==false)
        {
            peter_pan.play();
            document.getElementById("song").innerHTML="Song: Peter Pan";
        }
    }
    if(lWscore>0.2)
    {
        fill("red");
        circle(lWx,lWy,20,20);
        peter_pan.stop();
        if(song1==false)
        {
            harry_potter.play();
            document.getElementById("song").innerHTML="Song: Harry Potter";
        }
    }
    
}