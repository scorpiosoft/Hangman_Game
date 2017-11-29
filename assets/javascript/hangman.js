// THe Hangman Game Object
var Hangman
{

}

// This function is run whenever the user presses a key.
document.onkeyup = function(event)
{
  // save the event key for convenience
  var e_key;

  // debug the event
  console.log("event:", event);

  // throw away meta keys
  if (event.key.length > 1)
    return false;

  // throw away non-alpha keys, then lowercase those that remain
  if (isalpha(event.key))
  {
    e_key = event.key.toLowerCase();
  } else {
    return false;
  }

  var d_hang_word = document.getElementById("hang_word");

  d_hang_word.textContent = e_key;

};

// utility function which returns true if an alpha char is passed in, otherwise false
// takes a string as an argument, works best with one character strings
function isalpha(str)  
{
  var expr = /^[a-zA-Z]+$/;  
  if(str.match(expr))  
  {  
    console.log("[" + str  + "] is a letter");
    return true;  
  } else  
  {  
    console.log("[" + str  + "] is not a letter");
    return false;  
  }  
};  
