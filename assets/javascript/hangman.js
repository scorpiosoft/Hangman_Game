// The Hangman Game Object
var Hangman =
{
  "d_word": document.getElementById("hang_word"),
  "d_guesses": document.getElementById("prev_guesses"),
  "a_guesses": [],
}

// Key-Up event function
document.onkeyup = function(event)
{
  var i;
  var e_key; // lower case event key
  var guess_str; // string for the guesses

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

  Hangman.d_word.textContent = e_key;
  // build the guess_str
  for (i = 0; i < Hangman.a_guesses.length; ++i)
  {
    if (i === 0)
      guess_str = Hangman.a_guesses[0];
    else
      guess_str = guess_str + " " + Hangman.a_guesses[i];
  }
  Hangman.d_guesses.textContent = guess_str;
  Hangman.a_guesses.push(e_key.toUpperCase());

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
