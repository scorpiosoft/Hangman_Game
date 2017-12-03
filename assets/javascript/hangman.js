// DOM elements for playing sounds
var d_win = document.getElementById("win");
var d_hit = document.getElementById("hit");
var d_miss = document.getElementById("miss");
var d_game_over = document.getElementById("game_over");
d_win.volume = 0.2;
d_hit.volume = 0.2;
d_miss.volume = 0.2;
d_game_over.volume = 0.2;

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
  a_hits:      [],
  a_misses:    [],
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
    this.a_hits = [];
    this.a_misses = [];
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
    play_now(d_miss);
  },
}

// Key-Up event function
document.onkeyup = function(event)
{
  var i, idx;
  var e_key = String.fromCharCode(event.keyCode).toLowerCase();
  var scratch;
  var scratch; // string for the scratch

  // debug the event
  console.log("event:", event);

  // check for game start
  if (Hangman.started === false)
  {
    Hangman.start_game();
    return false;
  }

  // throw away non-alpha keys
  if (!isalpha(e_key))
  {
    return false;
  }

  // debug the key press
  console.log("e_key", e_key);

  // check guess vs word
  if (Hangman.check(e_key))
  {
    // if a new hit, display the guess in the word
    scratch = Hangman.a_hits.toString();
    if (scratch.includes(e_key))
      return false; // not a new hit

    Hangman.a_hits.push(e_key);
    // process the hit
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
          scratch = e_key;
        else
          scratch += " " + e_key;
      } else {
        if (i === 0)
          scratch = Hangman.cur_display.charAt(0);
        else
          scratch += " " + Hangman.cur_display.charAt(idx);
      }
    }
    Hangman.cur_display = scratch;
    Hangman.d_word.textContent = Hangman.cur_display;
    console.log("cur_correct", Hangman.cur_correct);
    play_now(d_hit);
  } else {
    // if a new miss, add the guess and increment the gallows
    scratch = Hangman.a_misses.toString();
    if (scratch.includes(e_key.toUpperCase()))
      return false; // not a new miss

    Hangman.a_misses.push(e_key.toUpperCase());
    // build the string of misses
    for (i = 0; i < Hangman.a_misses.length; ++i)
    {
      if (i === 0)
        scratch = Hangman.a_misses[0];
      else
        scratch = scratch + " " + Hangman.a_misses[i];
    }
    // display the guesses
    Hangman.d_guesses.textContent = scratch;
    // display the new gallows
    Hangman.miss();
  }

  // check for win or game over
  if (Hangman.cur_correct >= Hangman.cur_word.length)
  {
    Hangman.end_game("Y O U . W I N");
    Hangman.d_wins.textContent = ++(Hangman.wins) + " Wins";
    play_now(d_win);
  } else
  if (Hangman.cur_misses >= Hangman.game_over)
  {
    Hangman.end_game("G A M E . O V E R");
    play_now(d_game_over);
  }
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

// utility function for playing audio
function play_now(id)
{
  d_hit.pause();
  d_hit.currentTime = 0;
  d_miss.pause();
  d_miss.currentTime = 0;
  id.play();
};
