// The Hangman Game Object
var Hangman =
{
  started:     false,
  d_wins:      document.getElementById("hang_wins"),
  d_message:   document.getElementById("hang_message"),
  d_word:      document.getElementById("hang_word"),
  d_guesses:   document.getElementById("hang_guesses"),
  d_gallows:   document.getElementById("hang_gallows"),
  the_words:   ["queen", "beatles", "boston", "decemberists", "heartbreakers", "foreigner", "supertramp", "eagles", "aerosmith", "america", "badfinger", "badlees", "bangles", "berlin", "blondie", "cardigans", "commitments", "cracker", "cranberries", "danforths", "elastica", "fastball", "gorillaz", "honeydogs", "hooters", "offspring", "pretenders", "ramones", "smithereens", "soundgarden", "squeeze", "subdudes", "weezer", "yardbirds"],
  cur_word:    "",
  cur_display: "",
  cur_gallows: "",
  wins:        0,
  cur_correct: 0,
  cur_misses:  0,
  game_over:   6,
  a_guesses:   [],
  start_game: function()
  {
    this.started = true;
    this.d_message.textContent = "Good luck!";
    this.cur_word = this.the_words[Math.floor(Math.random() * this.the_words.length)];
    for (var i = 0; i < this.cur_word.length; ++i)
    {
      if (i === 0)
        this.cur_display = "_";
      else
        this.cur_display = this.cur_display + " _";
    }
    this.d_word.textContent = this.cur_display;
    this.cur_correct = 0;
    this.cur_misses = 0;
    this.set_gallows();
    this.d_gallows.innerHTML = this.cur_gallows;
    this.a_guesses = [];
    this.d_guesses.textContent = "";
  },
  end_game: function(msg)
  {
    this.started = false;
    this.d_word.textContent = msg;
    this.d_message.textContent = "Press any key to start.";
  },
  set_gallows: function()
  {
    this.cur_gallows = "<img src=assets/images/hangman" + this.cur_misses.toString() + ".png>";
  },
  check: function(c)
  {
    if(this.cur_word.includes(c))
    {  
      console.log("[" + c  + "] is a match");
      return true;  
    } else  
    {  
      console.log("[" + c  + "] is not a match");
      return false;  
    }  
    x
  },
  miss: function()
  {
    this.cur_misses++;
    // sanity check
    if (this.cur_misses > this.game_over)
    {
      alert("You are " + this.cur_misses + " times dead!");
      this.cur_misses = this.game_over;
    }
    this.set_gallows();
    this.d_gallows.innerHTML = this.cur_gallows;
  },
}

// Key-Up event function
document.onkeyup = function(event)
{
  var i, idx;
  var e_key; // lower case event key
  var guess_str; // string for the guesses
  var display; // string for the display

  // debug the event
  console.log("event:", event);

  // check for game start
  if (Hangman.started === false)
  {
    Hangman.start_game();
    return false;
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

  // debug display the guess
  console.log("e_key", e_key);

  // check guess vs word
  if (Hangman.check(e_key))
  {
    // if correct, display the guess in the word
    for (i = 0; i < Hangman.cur_word.length; ++i)
    {
      idx = ((i+1)*2)-2;
      // need to rebuild the entire display string
      if (Hangman.cur_word.charAt(i) === e_key)
      {
        Hangman.cur_correct++; // increment correct count
        console.log("replacing position " + i, "idx", idx);
        // Hangman.cur_display[((i+1)*2)-2] = e_key; // This would work in a real language!!!  Instead I have to add all sorts of extra logic to rebuild the string one piece at a time!!!
        if (i === 0)
          display = e_key;
        else
          display += " " + e_key;
      } else {
        if (i === 0)
          display = Hangman.cur_display.charAt(0);
        else
          display += " " + Hangman.cur_display.charAt(idx);
      }
    }
    Hangman.cur_display = display;
    Hangman.d_word.textContent = Hangman.cur_display;
    console.log("cur_correct", Hangman.cur_correct);
  } else {
    // if a new miss, add the guess and increment the gallows
    guess_str = Hangman.a_guesses.toString();
    if (guess_str.includes(e_key.toUpperCase()))
      return false; // not a new miss

    Hangman.a_guesses.push(e_key.toUpperCase());
    // build the guess_str
    for (i = 0; i < Hangman.a_guesses.length; ++i)
    {
      if (i === 0)
        guess_str = Hangman.a_guesses[0];
      else
        guess_str = guess_str + " " + Hangman.a_guesses[i];
    }
    // display the guesses
    Hangman.d_guesses.textContent = guess_str;
    // display the new gallows
    Hangman.miss();
  }

  // check for win or game over
  if (Hangman.cur_correct >= Hangman.cur_word.length)
  {
    Hangman.end_game("Y O U . W I N");
    Hangman.d_wins.textContent = ++(Hangman.wins) + " Wins";
  } else
  if (Hangman.cur_misses >= Hangman.game_over)
    Hangman.end_game("G A M E . O V E R");
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
