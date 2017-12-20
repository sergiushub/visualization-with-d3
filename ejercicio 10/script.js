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
        });

	var height = barHeight * pesos.length

	var svg = d3.select("body")
		.append("svg")
		.attr("width", width)
		.attr("height", height);

	var bar = svg.append("g")
		.selectAll("rect")
	    .data(pesos);

	bar.enter()
		.append("rect")
		.attr("y",function(d,i){return i*barHeight;})
	    .attr("width", function(d){return d/20;})
	    .attr("height", barHeight-1);

	bar.exit().remove();

}
