var dataset; //original dataset
var filterData = "";
let prevYear;
let year = 1983;
let timer = setInterval(automaticMap, 100);

/*http://www.d3noob.org/2013/03/a-simple-d3js-map-explained.html*/
var width = '100%',
    height = 560;

var projection = d3.geo.mercator()
    .center([0,5])
    .scale(300)
    .rotate([0,0]);

tip = d3.tip().attr('class', 'd3-tip').html(function(d) { 
    return "Country: " + d.country + "</br>" + "Percentage Affected: " +  d.percentage_affected + "<br/>" + "Bleaching Severity: " + d.bleaching_severity + "<br/>" + "Year Reported: " + d.year});

var svg = d3.select("#coral-map").append("svg")
    .attr("width", width)
    .attr("height", height);

var path = d3.geo.path()
    .projection(projection);

svg.call(tip)

var g = svg.append("g");

//scale for circle data points
var circleScale = d3.scale.sqrt().domain([0, 100]).range([0, 10]);

// load and display the World
d3.json("json/world-110m2.json", function(error, topology) {
    if(error) throw error;
    d3.csv("data/CoralBleachingCleaned.csv", function(error, data) {
        if(error) throw error;

        dataset = data;

        g.selectAll("path")
            .data(topojson.object(topology, topology.objects.countries)
                .geometries)
            .enter()
            .append("path")
            .attr("d", path)

        automaticMap();
       // drawVis(dataset);
    });               
});

//ensure that only points that aren't already on the map are added, so the entire map doesn't have to be rerendered
function keyfunc(d) {
    return d.id;
}

function drawVis(ndata) {
    var circle = g.selectAll("circle")
        .data(ndata, keyfunc)

    circle.exit()
        .transition()
        .duration(300)
        .ease("exp")
        .attr("r", 0)
            .remove()

    circle.enter().append("circle")
        .attr("cx", function(d) {
            return projection([d.lon, d.lat])[0];
        })
        .attr("cy", function(d) {
                return projection([d.lon, d.lat])[1];
        })
        .style("opacity", 0.8)
        .style("fill", function(d) {
            if(d.bleaching_severity === "HIGH") {
                return "#ec4e4e"
            } else if(d.bleaching_severity === "Medium") {
                return "#ee9a54"
            } else if(d.bleaching_severity === "Low") {
                return "#f6df53"
            } else {
                return "#00994C"
            }
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .attr("r", 0);

        circle
        .attr("cx", function(d) {
                return projection([d.lon, d.lat])[0];
        })
        .attr("cy", function(d) {
                return projection([d.lon, d.lat])[1];
        })
        .style("fill", function(d) {
            if(d.bleaching_severity === "HIGH") {
                return "#ec4e4e"
            } else if(d.bleaching_severity === "Medium") {
                return "#ee9a54"
            } else if(d.bleaching_severity === "Low") {
                return "#f6df53"
            } else {
                return "#00994C"
            }
        })
        .transition()
        .ease("quad")
        .attr("r", function(d) {
            return circleScale(parseFloat(d.percentage_affected)+1);
        })
}

//zooming and panning
var zoom = d3.behavior.zoom()
    .on("zoom",function() {
        g.attr("transform","translate("+ 
            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
        g.selectAll("path")  
            .attr("d", path.projection(projection)); 
});

svg.call(zoom)

var coralmap = d3.select('#coral-map')

coralmap.append('p').text('Select year:')
coralmap.append('input')
  .attr('class','inputRadius')
  .attr('id', 'yearInput')
  .attr('type','range')
  .attr('min',1983)
  .attr('max',2010)
  .attr('step',1)
  .attr('value',2010)
  .on('change',function() {
    coralmap.selectAll('h1').remove()
    coralmap.append('h1') 
        .attr('id', "#coral-map-title")
        .text('Coral Bleaching in ' + document.getElementById("yearInput").value);
  	filterUpdate(dataset);
  });

function filterUpdate(dataset) {
    let currentYear = document.getElementById("yearInput").value;
    filterData = dataset;

    if(currentYear != '2010') {
        filterData = filterData.filter(d => d.year <= currentYear); 
    }
    
    drawVis(filterData);
}

function automaticMap() {
    if(year <= 2010) {
        coralmap.selectAll('h1').remove()
        coralmap.append('h1') 
            .attr('id', "#coral-map-title")
            .text('Coral Bleaching in ' + year)

        mapAnimation(dataset, year);
        year++;
    } else {
        clearInterval(timer)
    }
}

function mapAnimation(dataset, year) {
    let currentYear = parseInt(year);

    filterData = dataset;

    if(currentYear != '2010') {
        filterData = filterData.filter(d => d.year <= currentYear); 
    }
    
    drawVis(filterData);
}