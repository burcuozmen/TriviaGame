$( document ).ready(function(){

// Question and answer objects =======================================
var mainObjects = [
 
    {
       question: "Who is the king of Westeros when the the series begins?",   
       answerChoices: ["Ned Stark" , "Jon Arryn" , "Robert Baratheon " , "Tyrion Lannister"],
       correctAnswer : 2
    },   
    {
      question: "What is the name of the continent on which most of the action of Game of Thrones  takes place?",  
      answerChoices: ["Westeros" , "Essos" , "King's Landing" , "Winterfell"],
      correctAnswer : 0
    }
  ];   

// Global variables =====================================

var running = false;
var pick;
var index;
var holder = [];
var theme = new Audio("assets/Audio/Game-of-Thrones.mp3");


//Counter variables========================
 var correctCount = 0;
 var wrongCount = 0;
 var unanswerCount = 0;

 
 
 
// timer variables===========================
 var timer = 20;
 var intervalId;

 

 
 
 
//Functions//==================================================================

 
// Click Start Button to Start the Game =======================================

    $("#start").on('click',function()
    {
        //Play theme music
        theme.play();
        //Hides the start button
        $("#start").hide();
        $("#reset").hide();
        displayQuestion();
        timeCount();
        score();
        for(var i = 0; i < mainObjects.length; i++) {
          holder.push(mainObjects[i]);
        }
        
    });


// Starting the Timer =======================================
 function timeCount()
    {  
       if (! running) 
       {
         intervalId = setInterval(decrement,1000);
         running = true; 
        }
    }   
  
// Decrement Timer Countdown ===================================
   function decrement (){
     
    $('#timeLeft').html("<h3>Time Left:  " + timer + "</h3>");
      timer -- ;

      // display "Time is Up" if the time reaches 0
       if (timer === 0)
      {
        unanswerCount++;
        stop();
        $("#questionInput").html('Time is Up');
        $(".answerchoice").hide();
        
      }
// Stop timer at 0 ============================================
    function stop ()
    {
      running = false;
      clearInterval(intervalId);

    }     
    
  };
//========================================================  
// Display Question & Answers (Main Objects) Function
function displayQuestion() 
{
  //generate random index in array
  
  index = Math.floor(Math.random()*mainObjects.length);
	pick = mainObjects[index];
  
  $('#questionInput').html("<h3>" + pick.question + "</h3>");
  for (var i=0 ; i <pick.answerChoices.length ; i++)
  {
     
    

     var userAnswerChoices= $('<div class= "answerchoice">');
     userAnswerChoices.html(pick.answerChoices[i]); 
     userAnswerChoices.attr("scoreValue" ,i);
     $('#answerInput').append(userAnswerChoices);

     

  }
}  

// Selecting Answers ==========================================
   $(".answerchoice").on('click', function()
   {
       userAnswer = parseInt($(this).attr("scoreValue"));
         
         if(userAnswer === pick.answerChoices)
         {
           correctCount++;
           $("#answerInput").html("<h3> Correct ! </h3>");
           stop();
         }
         else
         {
           wrongCount++
           $("#answerInput").html("<h3> Wrong ! </h3>");
           stop();

         }
       
   })


//=============================================================
// Calculate the Score =====================================================

  function score()
     {
       $("#scoreBoard").html("<h3> Correct Answers:  "+ correctCount + "</h3>");
       $("#scoreBoard").append("<h3> Wrong Answers:  "+ wrongCount + "</h3>");
       $("#scoreBoard").append("<h3> Blank Answers:  "+ unanswerCount + "</h3>");
     }

     
 // Reset The Game =====================================================    
     function resetGame ()
      {
        
        $("#reset").on("click", function() 
        {
            //Hides the reset button
            $("#reset").hide();
            $("#start").show();
            displayQuestion();
            timeCount();
            score();
            
            for(var i = 0; i < mainObjects.length; i++) 
            {
              holder.push(mainObjects[i]);
            }
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
            timer = 20;
        })

      }
    
    if(timer === 0 )
    {
      resetGame()
    }
       
        
    
      
});
