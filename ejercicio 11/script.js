console.log('running');

d3.csv("cars.csv", function(data) {
    crearVisualizacion(data);
});

function crearVisualizacion(data) {

	var width = 300;
	var barHeight = 4;

	var pesos = data.map(
        function(d){
            return parseInt(d['weight (lb)']);
        }
    );

	var x = d3.scale.linear()
		.domain([0, d3.max(pesos)])
	    .range([0, width]);

	var svg = d3.select("body")
		.append("svg")
	    .attr("width", width)
	    .attr("height", barHeight * pesos.length);

	var bar = svg.append("g")
		.selectAll("rect")
	    .data(pesos);

	bar.enter()
		.append("rect")
		.attr("y",function(d,i){return i*barHeight;})
	    .attr("width", function(d){console.log(x(d)); return x(d);})
	    .attr("height", barHeight - 1);

	bar.exit().remove();
}