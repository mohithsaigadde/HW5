/*
  Author & Contact
  Name: Mohith Sai Gadde
  Student ID: 02209215
  Email: MohithSai_Gadde@student.uml.edu
  GitHub Repository:
  GitHub Pages (Live Demo):
*/

var pieces = [
  {"letter":"A", "value":1, "amount":9},
  {"letter":"B", "value":3, "amount":2},
  {"letter":"C", "value":3, "amount":2},
  {"letter":"D", "value":2, "amount":4},
  {"letter":"E", "value":1, "amount":12},
  {"letter":"F", "value":4, "amount":2},
  {"letter":"G", "value":2, "amount":3},
  {"letter":"H", "value":4, "amount":2},
  {"letter":"I", "value":1, "amount":9},
  {"letter":"J", "value":8, "amount":1},
  {"letter":"K", "value":5, "amount":1},
  {"letter":"L", "value":1, "amount":4},
  {"letter":"M", "value":3, "amount":2},
  {"letter":"N", "value":1, "amount":5},
  {"letter":"O", "value":1, "amount":8},
  {"letter":"P", "value":3, "amount":2},
  {"letter":"Q", "value":10, "amount":1},
  {"letter":"R", "value":1, "amount":6},
  {"letter":"S", "value":1, "amount":4},
  {"letter":"T", "value":1, "amount":6},
  {"letter":"U", "value":1, "amount":4},
  {"letter":"V", "value":4, "amount":2},
  {"letter":"W", "value":4, "amount":2},
  {"letter":"X", "value":8, "amount":1},
  {"letter":"Y", "value":4, "amount":2},
  {"letter":"Z", "value":10, "amount":1}
];

var tileBag = {};
var totalTilesRemaining = 0;
var totalScore = 0;

function resetTileBag() {
  tileBag = {};
  totalTilesRemaining = 0;

  pieces.forEach(p => {
    tileBag[p.letter] = { value: p.value, remaining: p.amount };
    totalTilesRemaining += p.amount;
  });
}

function updateTilesRemainingDisplay() {
  $("#tiles-remaining").text(totalTilesRemaining);
}

function getTileImagePath(letter) {
  return "graphics_data/Scrabble_Tile_" + letter + ".jpg";
}

function createTileElement(letter) {
  var tile = $("<div></div>");
  tile.addClass("tile");
  tile.attr("data-letter", letter);
  tile.attr("data-value", tileBag[letter].value);

  var img = $("<img>").attr("src", getTileImagePath(letter));
  tile.append(img);

  tile.draggable({
    revert: "invalid",
    containment: "body",
    start: function () {
      $(this).data("prev-parent", $(this).parent());
    }
  });

  return tile;
}

function getRandomLetter() {
  var letters = Object.keys(tileBag);
  while (true) {
    var c = letters[Math.floor(Math.random() * letters.length)];
    if (tileBag[c].remaining > 0) return c;
  }
}

function dealTilesToRack(count) {
  var rack = $("#rack");
  var current = rack.children(".tile").length;
  var needed = Math.min(count, 7 - current);

  for (var i = 0; i < needed; i++) {
    var letter = getRandomLetter();
    var tile = createTileElement(letter);
    rack.append(tile);

    tileBag[letter].remaining--;
    totalTilesRemaining--;
  }
  updateTilesRemainingDisplay();
}

function setupDroppables() {

  $(".square").droppable({
    accept: ".tile",
    drop: function (event, ui) {

      var square = $(this);
      var tile = ui.draggable;
      var previous = tile.data("prev-parent");

      if (square.children(".tile").length > 0) {
        previous.append(tile);
        return;
      }

      tile.css({
        position: "absolute",
        top: "2px",
        left: "2px"
      });

      square.append(tile);

      var occupied = [];
      $(".square").each(function () {
        if ($(this).children(".tile").length > 0) {
          occupied.push(parseInt($(this).attr("data-index")));
        }
      });

      if (occupied.length > 1) {
        occupied.sort((a, b) => a - b);

        for (var i = 1; i < occupied.length; i++) {
          if (occupied[i] !== occupied[i - 1] + 1) {
            previous.append(tile);
            return;
          }
        }
      }

      tile.data("prev-parent", square);
    }
  });

  $("#rack").droppable({
    accept: ".tile",
    drop: function (event, ui) {
      var tile = ui.draggable;

      tile.css({
        position: "relative",
        top: "0px",
        left: "0px"
      });

      $("#rack").append(tile);
      tile.data("prev-parent", $("#rack"));
    }
  });
}

function computeWordAndScore() {
  var used = [];

  $(".square").each(function () {
    var tile = $(this).children(".tile");
    if (tile.length > 0) {
      used.push({
        index: parseInt($(this).attr("data-index")),
        value: parseInt(tile.attr("data-value")),
        letterMult: parseInt($(this).attr("data-letter-mult")),
        wordMult: parseInt($(this).attr("data-word-mult"))
      });
    }
  });

  if (used.length === 0)
    return { valid: false, reason: "Place a tile on the board.", score: 0 };

  used.sort((a, b) => a.index - b.index);

  for (var i = 1; i < used.length; i++) {
    if (used[i].index !== used[i - 1].index + 1)
      return { valid: false, reason: "Tiles must form a contiguous word.", score: 0 };
  }

  var base = 0;
  var wordMult = 1;

  used.forEach(s => {
    base += s.value * s.letterMult;
    wordMult *= s.wordMult;
  });

  return { valid: true, score: base * wordMult };
}

function playWord() {
  var result = computeWordAndScore();

  if (!result.valid) {
    $("#message").text(result.reason);
    return;
  }

  $("#current-word-score").text(result.score);
  totalScore += result.score;
  $("#total-score").text(totalScore);

  $("#message").text("Word played!");

  $(".square .tile").remove();
  dealTilesToRack(7);
}

function restartGame() {
  totalScore = 0;
  $("#total-score").text("0");
  $("#current-word-score").text("0");
  $("#rack").empty();
  $(".square .tile").remove();
  resetTileBag();
  updateTilesRemainingDisplay();
  dealTilesToRack(7);
}

$(function () {
  resetTileBag();
  updateTilesRemainingDisplay();
  setupDroppables();
  dealTilesToRack(7);

  $("#play-word").click(() => playWord());
  $("#restart-game").click(() => restartGame());
});
