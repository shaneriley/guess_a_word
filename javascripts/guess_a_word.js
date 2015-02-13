$(function() {
  var word = "abacus".toUpperCase().split(""),
      spaces = (new Array(word.length + 1)).join("<span></span>"),
      $spaces,
      incorrect = 0,
      guesses = 6;

  $("#spaces").html(spaces);
  $spaces = $("#spaces span");

  $(document).on("keyup", function(e) {
    var l = String.fromCharCode(e.which);

    if ($.inArray(l, word) !== -1) {
      $.each(word, function(i, j) {
        j === l && $spaces.eq(i).text(j);
      });
    }
    else {
      incorrect++;
      $("<span />", {
        text: l
      }).appendTo($("#guesses"));
      $("#apples").removeClass().addClass("guess_" + incorrect);
    }

    if (incorrect === guesses) {
      $(document).off(e);
    }
  });
});
