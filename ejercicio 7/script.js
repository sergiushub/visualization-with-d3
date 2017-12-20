console.log('running');

var datos = [1,10,20,30,40,50];

d3.select('body')
.selectAll("div")
.data(datos)
.enter()
.append("div")
.text(function(d){return String(d);})
.style("width", function(d){return String(d*5) + "px"});