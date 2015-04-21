$(function() {
  var word = "abacus".toUpperCase().split(""),
      spaces = (new Array(word.length + 1)).join("<span></span>"),
      $spaces,
      incorrect = 0,
      guesses = 6,
      correct_spaces = 0,
      letters_guessed = [];

  $("#spaces").html(spaces);
  $spaces = $("#spaces span");

  $(document).on("keyup", function(e) {
    var letter = String.fromCharCode(e.which);

    if (notALetter(e.which)) { return; }
    if (duplicateGuess(letter)) { return; }

    if ($.inArray(letter, word) !== -1) {
      fillBlanksFor(letter);

      if (correct_spaces === $spaces.length) {
        displayMessage("You win!");
        $(document).off(e);
      }
    }
    else {
      renderIncorrectGuess(letter);
    }

    if (incorrect === guesses) {
      $(document).off(e);
      displayMessage("Sorry! You're out of guesses");
    }
  });

  function notALetter(code) {
    var a_code = 65,
        z_code = 90;

    return code < a_code || code > z_code;
  }

  function duplicateGuess(letter) {
    var duplicate = letters_guessed.indexOf(letter) !== -1;

    if (!duplicate) { letters_guessed.push(letter); }

    return duplicate;
  }

  function displayMessage(text) {
    $("#message").text(text);
  }

  function fillBlanksFor(letter) {
    $.each(word, function(i, current_letter) {
      if (current_letter === letter) {
        $spaces.eq(i).text(current_letter);
        correct_spaces++;
      }
    });
  }

  function renderIncorrectGuess(letter) {
    incorrect++;
    $("<span />", {
      text: letter
    }).appendTo($("#guesses"));
    $("#apples").removeClass().addClass("guess_" + incorrect);
  }
});
