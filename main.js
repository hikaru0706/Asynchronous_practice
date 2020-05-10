

var apikey="https://opentdb.com/api.php?amount=10&type=multiple";

let clicked;
let correct;
let global_json;


document.getElementById("btn").addEventListener("click",function(e){

  if(e.target && e.target.className=="start"){
    clicked=0;
    correct=0;
  
    document.getElementById("header").innerText = "Is fetching...";
    document.getElementById("content").innerText = "Just a moment please";
    document.querySelector(".start").style.display = "none";
  
    fetch(apikey)
      .then(response => response.json())
      .then(json => {
        global_json = json;
        display(json,0);
      });
    }
    
  else if(e.target && e.target.className=="choice"){

          correct += e.target.innerText===global_json.results[clicked].correct_answer ? 1:0;
          
          clicked++;

          if (clicked==global_json.results.length){
            showresult(correct);
          }else{
          display(global_json,clicked);
          }
    }
    
  else if(e.target && e.target.className=="retry"){
          window.location.reload();

          // document.getElementById("header").innerText ="Welcome";
          // document.getElementById("content").innerText ="Press the following button";
          // document.querySelector('#btn').innerHTML = "<button class='start'>start</button>";
  }
});


function display(json,clicked){
      
      const arr = [json.results[clicked].correct_answer].concat(json.results[clicked].incorrect_answers);
      
      let shuffle_array=shuffle(arr);
  
      document.getElementById("header").innerText = "Question"+Number(clicked+1);
      document.getElementById("category").innerText = "[category] : "+json.results[clicked].category;
      document.getElementById("difficulty").innerText = "[difficulty] : "+json.results[clicked].difficulty;
      document.getElementById("content").innerText = json.results[clicked].question;
      
      
      let html="";
      
      for (let i=0;i<arr.length; i++){
        html+= `<button class='choice'>`+shuffle_array[i]+`</button><br>`;
      }
      document.querySelector('#btn').innerHTML = html;
}



function showresult(correct){

      document.getElementById("header").innerText = "Number of correct answers is " + correct ;
      document.getElementById("category").style.display = "none";
      document.getElementById("difficulty").style.display = "none";
      document.getElementById("content").innerText = "Challenge again";
      document.querySelector('#btn').innerHTML = "<button class='retry'>retry</button>";
}




function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
