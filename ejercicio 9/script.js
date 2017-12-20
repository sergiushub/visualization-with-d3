console.log('running');

var datos = [10,20,30,40,50];

var width = 800;
var height = 600;

var svg = d3.select("body")
	.append("svg")
    .attr("width", width)
    .attr("height", height);

var circles = svg.selectAll("circle").data(datos);


circles.enter()
    .append("circle");

circles.attr("cx", function(d, i) { return (i * 100) + 20; } )
    .attr("cy", height/2)
    .attr("r", function(d) {return d;})
    .style("stroke-width",function(d) {return d/10;});

circles.exit().remove();