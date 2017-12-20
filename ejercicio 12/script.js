console.log('running');

d3.csv("cars.csv", function(data) {
    crearVisualizacion(data);
});

function crearVisualizacion(data) {

	var barWidth = 4;
	var height = 300;

	var pesos = data.map(
        function(d){
            return parseInt(d['weight (lb)']);
        }
    );

	var x = d3.scale.linear()
		.domain([0, d3.max(pesos)])
	    .range([0, height]);

	var svg = d3.select("body")
		.append("svg")
	    .attr("width", barWidth * pesos.length)
	    .attr("height", height);

	var bar = svg.append("g")
		.selectAll("rect")
	    .data(pesos);

	bar.enter()
		.append("rect")
		.attr("x", function(d,i){return i*barWidth;})
		.attr("y", function(d){return height-x(d);})
	    .attr("width", barWidth - 1)
	    .attr("height", function(d){return x(d);});

	bar.exit().remove();
}