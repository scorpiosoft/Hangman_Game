// The Hangman Game Object
var Hangman =
{
  started:     false,
  d_message:   document.getElementById("hang_message"),
  d_word:      document.getElementById("hang_word"),
  d_guesses:   document.getElementById("hang_guesses"),
  d_gallows:   document.getElementById("hang_gallows"),
  the_words:   ["queen", "beatles", "boston", "decemberists", "heartbreakers", "foreigner", "supertramp", "eagles", "aerosmith", "america", "badfinger", "badlees", "bangles", "berlin", "blondie", "cardigans", "commitments", "cracker", "cranberries", "danforths", "elastica", "fastball", "gorillaz", "honeydogs", "hooters", "offspring", "pretenders", "ramones", "smithereens", "soundgarden", "squeeze", "subdudes", "weezer", "yardbirds"],
  cur_word:    "",
  cur_gallows: "",
  a_guesses:   [],
  start_game: function()
  {
    this.started = true;
    this.d_message.textContent = "Good luck!";
    this.cur_word = this.the_words[Math.floor(Math.random() * this.the_words.length)];
    this.set_gallows(0);
    this.d_gallows.innerHTML = this.cur_gallows;
  },
  end_game: function()
  {
    this.started = false;
    this.d_word.textContent = "G A M E . O V E R";
    this.d_message.textContent = "Press any key to start.";
  },
  set_gallows: function(num)
  {
    this.cur_gallows = "<img src=assets/images/hangman" + num.toString() + ".png>";
  },
}

// Key-Up event function
document.onkeyup = function(event)
{
  var i;
  var e_key; // lower case event key
  var guess_str; // string for the guesses

  // debug the event
  console.log("event:", event);

  // check for game start / end
  if (Hangman.started === false)
  {
    Hangman.start_game();
  }

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
