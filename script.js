//var answers = {Q1 : "Number", Q2 : "Null", Q3: "document.QuerySelector()", Q4: "asdf", Q5: "grgr"}
var time = 60;
var questions = [["What is Docker?","Platform as a Service"],["What is JavaScript?","Programming Language"],["What is a Heap Sort?","Sorting Algorithm"],["What is a '%' called in JS?","Modulus"],["What is Alan Turing known for?","Turing Machine"]];
var answers = [["Cloud Service","An Algorithm","Platform as a Service","An OS"],["Markup Language","Database","IDE","Programming Language"],["Sorting Algorithm","Data Structure","Time Complexity","Virtual Environment"],["Percent","Remainder","Modulus","Array"],["Turing Machine","Turing Algorithm","Dijkstra's Algorithm","JavaScript"]];
var i = 0;
var score = 0;
var pause = false;
var hiscore = {};
hiscore = JSON.parse(localStorage.getItem('score')) || {};


function question(){
    document.querySelector("#question").innerHTML = questions[i][0];
    for (let j= 0; j <4; j++){
        document.querySelector("#quiz").children[j].innerHTML = answers[i][j];
        document.querySelector("#quiz").children[j].addEventListener("click",check);
    }
}

function intro(){
    
    document.querySelector("#question").innerHTML = "Click Start to Begin"
    document.querySelector("#quiz").children[0].innerHTML = "Start";
    document.querySelector("#quiz").children[0].addEventListener("click", start);
    document.querySelector("#quiz").children[1].style.display = "none"
    document.querySelector("#quiz").children[2].style.display = "none"
    document.querySelector("#quiz").children[3].style.display = "none"
}

function start(){
    setInterval(timedisplay,1000);
    document.querySelector("#quiz").children[1].style.display = "block"
    document.querySelector("#quiz").children[2].style.display = "block"
    document.querySelector("#quiz").children[3].style.display = "block"
    question();

}

function check(event){
    if(event.target.innerHTML!== questions[i][1]){
        i++;
        time = time - 10;
        score-= 5
    } else {
        i++;
        score+= 10;
    }
    if(i < 5 && time>0){
        question();
    } else {
        pause = true;
    }
}

function timedisplay(){
    if (time > 0 && !pause){
        time = time - 1;
    } else {
        gameover();
    }
    document.querySelector("#timer").innerHTML = time;
}

function gameover(){
    document.querySelector("#score").innerHTML = "Your score: " + score;
    document.querySelector("#quiz").setAttribute("style","display:none");
    document.querySelector("#question").setAttribute("style","display:none");
    document.querySelector("#gameover").setAttribute("style","display:block");
    document.querySelector("#submit").addEventListener("click",save);
    document.querySelector("#clear").addEventListener("click",clear);
    
}

function clear (){
    document.querySelector("#hiscores").innerHTML ="";
    localStorage.clear;
    hiscore = {};
}



function save(){
    var g =score;
    document.querySelector("#hiscores").innerHTML ="";
    hiscore[document.querySelector("#list").value] = g;
    localStorage.setItem('score',JSON.stringify(hiscore));
    for(var item in hiscore){
        document.querySelector("#hiscores").innerHTML += `<li>Name: ${item}, HiScore: ${hiscore[item]}</li>`
    };
    
}



intro();
