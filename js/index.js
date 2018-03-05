let rows = parseInt($("#rows").val());
let columns = parseInt($("#columns").val());
let divideVal = 0;
let boardSize = 0;
let value = 0;
let coralRows = Math.floor(rows * 0.70);
let fishRows = rows - coralRows;
let tempChoice = 25;
let popTimer;
let shrinkPopTimer;
let popFishTimer;
let popTimerArray = [];
let shrinkPopArray = [];
let popFishArray = [];
gridSize();

var colors = d3.scale.threshold()
  .range(["#011628", "#0f5c9b", "#3e88c4", "#66a4d6", "#e8dede", "#c4a4a4"])
  .domain([0, 18, 23, 30, 41, 61]);

var coralColors = d3.scale.threshold()
  .range(["#FFFFFF", "#FFFFFF", "#e8acb8", "#E05073", "#e8acb8", "#EFE5E5"])
  .domain([8, 18, 23, 30, 41, 51]);

$('#cold-temp').click(function(){
  tempChoice = 17;
  $('#slider-value').empty();
  $('#slider-value').append(`Current water temperature is below 18° C`);

  // remove dead coral
  let deadCoral = d3.selectAll('.dead');
  for(let i = 0; i < deadCoral.length; i++) {
    $(deadCoral[i]).empty();
    $(deadCoral[i]).removeClass("dead");
  }

  d3.selectAll('.coral-svg').selectAll('path')
    .transition()
    .duration(1000)
    .style('fill', coralColors(tempChoice));

  d3.selectAll('.ocean')
    .transition()
    .duration(1000)
    .style('background-color', colors(tempChoice));

  d3.selectAll('#grid-bg')
    .transition()
    .duration(1000)
    .style('background-color', colors(tempChoice));

  // stop removing fish + killing coral during hot bleached
  for (var idx in shrinkPopArray) {
    clearInterval(shrinkPopArray[idx]);
  }

  // start shrinking fish pop + killing coral
  shrinkPopTimer = setInterval(shrink, 1000);
  shrinkPopArray.push(shrinkPopTimer);

  // stop populating coral + fish during healthy
  for (var idx in popTimerArray) {
    clearInterval(popTimerArray[idx]);
  }

  // stop populating fish during stressed
  for (var idx in popFishArray) {
    clearInterval(popFishArray[idx]);
  }
});

$('#tolerable-cold-temp').click(function(){
  tempChoice = 18;
  $('#slider-value').empty();
  $('#slider-value').append(`Current water temperature is between 18° C and 22° C`);

  // remove dead coral
  let deadCoral = d3.selectAll('.dead');
  for(let i = 0; i < deadCoral.length; i++) {
    $(deadCoral[i]).empty();
    $(deadCoral[i]).removeClass("dead");
  }

  d3.selectAll('.coral-svg').selectAll('path')
    .transition()
    .duration(1000)
    .style('fill', coralColors(tempChoice));

  d3.selectAll('.ocean')
    .transition()
    .duration(1000)
    .style('background-color', colors(tempChoice));

  d3.selectAll('#grid-bg')
    .transition()
    .duration(1000)
    .style('background-color', colors(tempChoice));

  // stop populating fish during heat stressed 
  for (var idx in popFishArray) {
    clearInterval(popFishArray[idx]);
  }

  // start populating fish during stressed
  popFishTimer = setInterval(populateFish, 1000);
  popFishArray.push(popFishTimer);

  // stop removing fish + killing coral during bleached
  for (var idx in shrinkPopArray) {
    clearInterval(shrinkPopArray[idx]);
  }

  // stop populating fish + coral during healthy
  for (var idx in popTimerArray) {
    clearInterval(popTimerArray[idx]);
  }
});

$('#optimal-temp').click(function(){
  tempChoice = 23;
  $('#slider-value').empty();
  $('#slider-value').append(`Current water temperature is between 23° C and 29° C`);

  // remove dead coral
  let deadCoral = d3.selectAll('.dead');
  for(let i = 0; i < deadCoral.length; i++) {
    $(deadCoral[i]).empty();
    $(deadCoral[i]).removeClass("dead");
  }

  d3.selectAll('.coral-svg').selectAll('path')
    .transition()
    .duration(1000)
    .style('fill', coralColors(tempChoice));

  d3.selectAll('.ocean')
    .transition()
    .duration(1000)
    .style('background-color', colors(tempChoice));

  d3.selectAll('#grid-bg')
    .transition()
    .duration(1000)
    .style('background-color', colors(tempChoice));

  // start populating coral + fish
  popTimer = setInterval(populate, 1000);
  popTimerArray.push(popTimer);

  // stop removing fish + killing coral during bleached
  for (var idx in shrinkPopArray) {
    clearInterval(shrinkPopArray[idx]);
  }

  // stop populating fish during stressed
  for (var idx in popFishArray) {
    clearInterval(popFishArray[idx]);
  }
});

$('#tolerable-hot-temp').click(function(){
  tempChoice = 30;
  $('#slider-value').empty();
  $('#slider-value').append(`Current water temperature is between 30° C and 40° C`);

  // remove dead coral
  let deadCoral = d3.selectAll('.dead');
  for(let i = 0; i < deadCoral.length; i++) {
    $(deadCoral[i]).empty();
    $(deadCoral[i]).removeClass("dead");
  }

  d3.selectAll('.coral-svg').selectAll('path')
    .transition()
    .duration(1000)
    .style('fill', coralColors(tempChoice));

  d3.selectAll('.ocean')
    .transition()
    .duration(1000)
    .style('background-color', colors(tempChoice));

  d3.selectAll('#grid-bg')
    .transition()
    .duration(1000)
    .style('background-color', colors(tempChoice));

  // stop populating fish during cold stressed 
  for (var idx in popFishArray) {
    clearInterval(popFishArray[idx]);
  }

  // start populating fish during stressed
  popFishTimer = setInterval(populateFish, 1000);
  popFishArray.push(popFishTimer);

  // stop removing fish + killing coral during bleached
  for (var idx in shrinkPopArray) {
    clearInterval(shrinkPopArray[idx]);
  }

  // stop populating fish + coral during healthy
  for (var idx in popTimerArray) {
    clearInterval(popTimerArray[idx]);
  }
});

$('#hot-temp').click(function(){
  tempChoice = 41;
  $('#slider-value').empty();
  $('#slider-value').append(`Current water temperature is above 40° C`);

  // remove dead coral
  let deadCoral = d3.selectAll('.dead');
  for(let i = 0; i < deadCoral.length; i++) {
    $(deadCoral[i]).empty();
    $(deadCoral[i]).removeClass("dead");
  }
  
  d3.selectAll('.coral-svg').selectAll('path')
    .transition()
    .duration(1000)
    .style('fill', coralColors(tempChoice));

  d3.selectAll('.ocean')
    .transition()
    .duration(1000)
    .style('background-color', colors(tempChoice));

  d3.selectAll('#grid-bg')
    .transition()
    .duration(1000)
    .style('background-color', colors(tempChoice));

  // stop removing fish + killing coral during cold bleached
  for (var idx in shrinkPopArray) {
    clearInterval(shrinkPopArray[idx]);
  }

  // start shrinking fish pop + killing coral
  shrinkPopTimer = setInterval(shrink, 1000);
  shrinkPopArray.push(shrinkPopTimer);

  // stop populating coral + fish during healthy
  for (var idx in popTimerArray) {
    clearInterval(popTimerArray[idx]);
  }

  // stop populating fish during stressed
  for (var idx in popFishArray) {
    clearInterval(popFishArray[idx]);
  }
});

/*var oceanSlider = d3.select('#ocean-slider')
oceanSlider.append('input')
  .attr('id', 'ocean-input')
  .attr('type', 'range')
  .attr('min', 8)
  .attr('max', 50)
  .attr('step', 1)
  .attr('value', 25)
  .on('change', function () {
    $('#slider-value').empty();
    $('#slider-value').append(`Current water temperature: ${$("#ocean-input").val()}° C`)
    tempChoice = parseInt(d3.select('#ocean-input').property('value'));*/
    /*d3.selectAll('.ocean')
      .transition()
      .duration(1000)
      .style('background-color', colors(tempChoice));*/

    // grow coral & fish population when healthy
    /*if(tempChoice < 23 || tempChoice > 29) {
      for (var idx in timerArray) {
        clearInterval(timerArray[idx]);
      }
    } else {
      timer = setInterval(populate, 1000);
      timerArray.push(timer);
    }

    // shrink fish & kill coral population when bleached
    if(tempChoice < 18 || tempChoice > 40) {
      shrinkPopTimer = setInterval(shrink, 1000);
      shrinkPopArray.push(shrinkPopTimer);
      let deadCoral = d3.selectAll('.dead');
      for(let i = 0; i < deadCoral.length; i++) {
        $(deadCoral[i]).empty();
        $(deadCoral[i]).removeClass("dead");
      }
    } else {
      for (var idx in shrinkPopArray) {
        clearInterval(shrinkPopArray[idx]);
      }
    }

    // gradually add fish back during stressed
    if((tempChoice >= 18 && tempChoice < 23) || (tempChoice > 29 && tempChoice <= 40)) {
      popFishTimer = setInterval(populateFish, 1000);
      popFishArray.push(popFishTimer);
      let deadCoral = d3.selectAll('.dead');
      for(let i = 0; i < deadCoral.length; i++) {
        $(deadCoral[i]).empty();
        $(deadCoral[i]).removeClass("dead");
      }
    } else {
      for (var idx in popFishArray) {
        clearInterval(popFishArray[idx]);
      }
    }

    $('#ocean-status').empty();
    if (tempChoice < 18) {
      $('#ocean-status').append("Ocean temperature is too cold!")
    } else if (tempChoice >= 18 && tempChoice < 23) {
      $('#ocean-status').append("Ocean temperature is cold!")
    } else if (tempChoice >= 23 && tempChoice <= 29) {
      $('#ocean-status').append("Ocean temperature is optimal!")
    } else if (tempChoice > 29 && tempChoice <= 40) {
      $('#ocean-status').append("Ocean temperature is tolerable!")
    } else if (tempChoice > 40) {
      $('#ocean-status').append("Ocean temperature is too hot!")
    }

    d3.selectAll('.coral-svg').selectAll('path')
      .transition()
      .duration(1000)
      .style('fill', coralColors(tempChoice));
  });*/

function populateFish() {
  let fishExit = false;

  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
      let randomNumber = Math.floor((Math.random() * 100) + 1);
      if (fishRows >= i) {
        if (fishExit) {
          break;
        }
        if ($(`#row${i} #col${j}`).html() == "") {
          if (randomNumber <= 3) {
            $(`#row${i} #col${j}`).append(`<span class="fish"><img class="fish" src="svg/fishes.svg" height="${value / 2}px" width="${value / 2}px"></span>`);
            fishExit = true;
          }
        }
      } 
      $(`#row${i} #col${j} span img`).css("margin-top", ((value / 2) / 2) - 1);
      $(`#row${i} #col${j} span img`).css("margin-bottom", ((value / 2) / 2) - 1);
      convertToSvg();
    }
    if (fishExit) {
      break;
    }
  }
}

function shrink() {
  let fishExit = false;
  let coralExit = false;

  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
      let randomNumber = Math.floor((Math.random() * 100) + 1);
      if (fishRows >= i) {
        if (fishExit) {
          break;
        }
        if ($(`#row${i} #col${j} span`).html() != "") {
          if (randomNumber <= 7) {
            $(`#row${i} #col${j} span`).empty();
            fishExit = true;
          }
        }
      } else {
        if (coralExit) {
          break;
        }
        if ($(`#row${i} #col${j} span`).html() != "") {
          if (randomNumber <= 12) {
            $(`#row${i} #col${j} span`).addClass("dead");
            d3.select(`#row${i} #col${j} span .coral-svg`).selectAll('path')
            .transition()
            .duration(1000)
            .style('fill', "#3e3433");
            coralExit = true;
          }
        }
      }
      if (fishExit || coralExit) {
        break;
      }
    }
    if (fishExit || coralExit) {
      break;
    }
  }
}

function populate() {
  let fishExit = false;
  let coralExit = false;

  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
      let randomNumber = Math.floor((Math.random() * 100) + 1);
      if (fishRows >= i) {
        if (fishExit) {
          break;
        }
        if ($(`#row${i} #col${j}`).html() == "") {
          if (randomNumber <= 5) {
            $(`#row${i} #col${j}`).append(`<span class="fish"><img class="fish" src="svg/fishes.svg" height="${value / 2}px" width="${value / 2}px"></span>`);
            fishExit = true;
          }
        }
      } else {
        if (coralExit) {
          break;
        }
        if ($(`#row${i} #col${j}`).html() == "") {
          if (randomNumber <= 10) {
            $(`#row${i} #col${j}`).append(`<span class="coral"><img class="coral-svg" src="svg/coral.svg" height="${value / 2}px" width="${value / 2}px"></span>`);
            coralExit = true;
          }
        }
      }
      $(`#row${i} #col${j} span img`).css("margin-top", ((value / 2) / 2) - 1);
      $(`#row${i} #col${j} span img`).css("margin-bottom", ((value / 2) / 2) - 1);
      convertToSvg();

      if (fishExit || coralExit) {
        break;
      }
    }
    if (fishExit || coralExit) {
      break;
    }
  }
}

$("#rows").on("input", function (e) {
  gridSize();
});

$("#columns").on("input", function (e) {
  gridSize();
});

function gridSize() {
  rows = parseInt($("#rows").val());
  columns = parseInt($("#columns").val());
  coralRows = Math.floor(rows * 0.70);
  fishRows = rows - coralRows;

  if (columns > rows) {
    boardSize = 528;
    divideVal = columns;
    value = Math.floor(boardSize / divideVal);
  } else {
    boardSize = 462;
    divideVal = rows;
    value = Math.floor(boardSize / divideVal);
  }

  $("#grid-bg").empty();
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
      if (j == 1) {
        $("#grid-bg").append(`<div id="row${i}"></div>`)
        $(`#row${i}`).css("height", value);
      }

      let randomNumber = Math.floor((Math.random() * 100) + 1)
      if (fishRows >= i) {
        if (randomNumber <= 40) {
          $(`#row${i}`).append(`<div class="ocean" id="col${j}"><span class="fish"><img class="fish-svg" src="svg/fishes.svg" height="${value / 2}px" width="${value / 2}px"></span></div>`);
        } else {
          $(`#row${i}`).append(`<div class="ocean" id="col${j}"></div>`);
        }
      } else {
        if (randomNumber <= 70) {
          $(`#row${i}`).append(`<div class="ocean" id="col${j}"><span class="coral"><img class="coral-svg" src="svg/coral.svg" height="${value / 2}px" width="${value / 2}px"></span></div>`);
        } else {
          $(`#row${i}`).append(`<div class="ocean" id="col${j}"></div>`);
        }
      }

      $(`#row${i} #col${j} span img`).css("margin-top", ((value / 2) / 2) - 1);
      $(`#row${i} #col${j} span img`).css("margin-bottom", ((value / 2) / 2) - 1);
      $(`#row${i} #col${j}`).css("height", (value) - 2);
      $(`#row${i} #col${j}`).css("width", (value) - 2);
      $(`#row${i} #col${j}`).css("top", value * (i - 1));
      $(`#row${i} #col${j}`).css("left", value * (j - 1));
    }
  }

  popTimer = setInterval(populate, 1000);
  popTimerArray.push(popTimer);
}

$(document).ready(function () {
  convertToSvg();
});

// https://stackoverflow.com/questions/11978995/how-to-change-color-of-svg-image-using-css-jquery-svg-image-replacement
function convertToSvg() {
  $('img[src$=".svg"]').each(function () {
    var $img = jQuery(this);
    var imgURL = $img.attr('src');
    var attributes = $img.prop("attributes");

    $.get(imgURL, function (data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find('svg');

      // Remove any invalid XML tags
      $svg = $svg.removeAttr('xmlns:a');

      // Loop through IMG attributes and apply on SVG
      $.each(attributes, function () {
        $svg.attr(this.name, this.value);
      });

      // Replace IMG with SVG
      $img.replaceWith($svg);
    }, 'xml');
  });
}
