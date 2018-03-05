sr.reveal('#coral-line', { duration: 1000, delay: 1000 });

var waypoint = new Waypoint({
    element: document.getElementById('coral-map'),
    handler: function(direction) {
        d3.select("#coral-line-title h1").remove();
        d3.select("#coral-line svg").remove();
        intialize();
    }
  })

/* http://bl.ocks.org/markmarkoh/8700606 */

function intialize() {
    var margin = {top: 80, right: 80, bottom: 80, left: 80},
        width = 900 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;


    // Scales and axes. Note the inverted domain for the y-scale: bigger is up!
    var x = d3.scale.linear().range([0, width]),
        y = d3.scale.linear().range([height, 0]),
        xAxis = d3.svg.axis().scale(x).tickSize(-height).tickSubdivide(true).tickFormat(d3.format("d")),
        yAxis = d3.svg.axis().scale(y).ticks(4).orient("right");

    // An area generator, for the light fill.
    var area = d3.svg.area()
        .interpolate("monotone")
        .x(function(d) { return x(d.year); })
        .y0(height)
        .y1(function(d) { return y(parseFloat(d.percentage_affected)); });

    // A line generator, for the dark stroke.
    var line = d3.svg.line()
        .interpolate("monotone")
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(parseFloat(d.percentage_affected)); });

    //tool tip
    tip = d3.tip().attr('class', 'd3-tip').html(function(d) { 
        return "Cases: " +  d.percentage_affected + "<br/>" + "Bleaching Severity: " + d.bleaching_severity + "<br/>" + "Year Reported: " + d.year});

d3.csv("data/CoralBleachingCleaned.csv", function(error, data) {

  var high = data.filter(function(d) {
    return d.bleaching_severity == "HIGH";
  });

  var highBleaching = {}
  var highArray = [];
  for(i = 0; i < high.length; i++) {
      if(highBleaching[high[i].year] == undefined) {
          highBleaching[high[i].year] = 1;
      } else {
        highBleaching[high[i].year] = highBleaching[high[i].year] + 1;
      }
  }

  for(var key in highBleaching) {
      highArray.push({year: key, percentage_affected: highBleaching[key]})
  }

  var medium = data.filter(function(d) {
    return d.bleaching_severity == "Medium";
  });

  var mediumBleaching = {}
  var mediumArray = [];
  for(i = 0; i < medium.length; i++) {
      if(mediumBleaching[medium[i].year] == undefined) {
          mediumBleaching[medium[i].year] = 1;
      } else {
        mediumBleaching[medium[i].year] = mediumBleaching[medium[i].year] + 1;
      }
  }

  for(var key in mediumBleaching) {
      mediumArray.push({year: key, percentage_affected: mediumBleaching[key]})
  }

  var low = data.filter(function(d) {
    return d.bleaching_severity == 'Low';
  });

  var lowBleaching = {}
  var lowArray = [];
  for(i = 0; i < low.length; i++) {
      if(lowBleaching[low[i].year] == undefined) {
          lowBleaching[low[i].year] = 1;
      } else {
        lowBleaching[low[i].year] = lowBleaching[low[i].year] + 1;
      }
  }

  for(var key in lowBleaching) {
      lowArray.push({year: key, percentage_affected: lowBleaching[key]})
  }

  var no = data.filter(function(d) {
    return d.bleaching_severity == 'No Bleaching';
  });

  var noBleaching = {}
  var noArray = [];
  for(i = 0; i < no.length; i++) {
      if(noBleaching[no[i].year] == undefined) {
          noBleaching[no[i].year] = 1;
      } else {
        noBleaching[no[i].year] = noBleaching[no[i].year] + 1;
      }
  }

  for(var key in noBleaching) {
      noArray.push({year: key, percentage_affected: noBleaching[key]})
  }

  x.domain(d3.extent(data, function(d) { return d.year; })).nice();
  y.domain([0, 260]);

  // Add an SVG element with the desired dimensions and margin.
  var svgLine = d3.select("#coral-line").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + 30 + "," + margin.top + ")")

  // Add the clip path.
  svgLine.append("clipPath")
      .attr("id", "clip")
    .append("rect")
      .attr("width", width)
      .attr("height", height);

  // Add the x-axis.
  svgLine.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", 420)
        .attr("y", 40)
        .style("text-anchor", "end")
        .text("Year");

  // Add the y-axis.
  svgLine.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + (width + 10) + "," + -5 + ")")
      .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 45)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("# Of Bleaching Cases Reported")

/*http://bl.ocks.org/Matthew-Weber/5645518*/
svgLine.selectAll('.line')
.data([highArray, mediumArray, lowArray, noArray])
.enter()
    .append('path')
    .attr('class', 'line')
    .style('stroke', function(d) {
        if(d == highArray) {
            return "#ec4e4e";
        } else if(d == mediumArray) {
            return "#ee9a54";
        } else if(d == lowArray) {
            return "#f6df53";
        } else if(d == noArray) {
            return "#00994C";
        }
    })
    .on("mouseover", function (d) {                                  
        d3.select(this)                          //on mouseover of each line, give it a nice thick stroke
        .style("stroke-width",'6px')
        var selectLines = $('.line').not(this);     //select all the rest of the lines, except the one you are hovering on and drop their opacity
        d3.selectAll(selectLines)
            .style("opacity", 0.3);
    })
    .on("mouseout",	function(d) {        //undo everything on the mouseout
        d3.select(this)
            .style("stroke-width",'2.5px');
        var selectLines = $('.line').not(this);
        d3.selectAll(selectLines)
            .style("opacity", 1);
    })
    .attr('clip-path', 'url(#clip)')
    .attr('d', function(d) {
        return line(d);
    });

//creates legend for the line graph
var legend = svgLine.selectAll(".legend")
    .data(["#ec4e4e", "#ee9a54", "#f6df53", "#00994C"])
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(" + -600 + ',' + i * 20 + ")"; });

legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function(d) {
        return d;
    });

legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { 
        if(d == "#ec4e4e") {
            return "High"
        } else if(d == "#ee9a54") {
            return "Med"
        } else if(d == "#f6df53") {
            return "Low"
        } else {
            return "None"
        }
    });

d3.select("#coral-line-title").append('h1') 
        .text('Number of Coral Bleaching Cases per Year');

  /* Add 'curtain' rectangle to hide entire graph */
  var curtain = svgLine.append('rect')
    .attr('x', -1 * width)
    .attr('y', -1 * height)
    .attr('height', height)
    .attr('width', width)
    .attr('class', 'curtain')
    .attr('transform', 'rotate(180)')
    .style('fill', '#ffffff')

  /* Create a shared transition for anything we're animating */
  var t = svgLine.transition()
    .delay(750)
    .duration(6000)
    .ease('linear')
    .each('end', function() {
      d3.select('line.guide')
        .transition()
        .style('opacity', 0)
        .remove()
    });

  t.select('rect.curtain')
    .attr('width', 0);

});
}

function linkHover(bleaching){
    if(bleaching == "high") {
        
    }
}
