function openScene1(){
    window.open('scene1.html');
}
function openScene2(){
    window.open('scene2.html', '_blank');
}
function openScene3(){
    window.open('scene3.html', '_blank');
}
function openScene0(){
    window.open('index.html');
}



 function main(){


    const country_col = 'country';
    
    
    d3.csv('complete.csv').then(function(data1)  {
        
        const all_countries = data1.map(d => d[country_col]);

        // Print the variable to see its contents
        console.log(all_countries);

        // Count the occurrences of 'us'
        occurrencesOfUS = all_countries.reduce((count, country) => {
            return count + (country === 'us' ? 1 : 0);
        }, 0);

        // Count the occurrences of 'gb'
        occurrencesOfGB = all_countries.reduce((count, country) => {
            return count + (country === 'gb' ? 1 : 0);
        }, 0);

        // Count the occurrences of 'ca'
        occurrencesOfCa = all_countries.reduce((count, country) => {
            return count + (country === 'ca' ? 1 : 0);
        }, 0);
    
        // Count the occurrences of 'au'
        occurrencesOfAu = all_countries.reduce((count, country) => {
            return count + (country === 'au' ? 1 : 0);
        }, 0);

        // Count the occurrences of 'de'
        occurrencesOfDe = all_countries.reduce((count, country) => {
            return count + (country === 'de' ? 1 : 0);
        }, 0);

        // Count the occurrences of null rows
        occurrencesOfNull = all_countries.reduce((count, country) => {
            return count + (country === '' ? 1 : 0);
        }, 0);

        // Print the count
        console.log("Occurrences of 'us':", occurrencesOfUS); // 70293
        console.log("Occurrences of 'gb':", occurrencesOfGB); // 2050
        console.log("Occurrences of 'au':", occurrencesOfAu); // 593
        console.log("Occurrences of 'ca':", occurrencesOfCa); // 3266
        console.log("Occurrences of 'de':", occurrencesOfDe); // 112
        console.log("Occurrences of null:", occurrencesOfNull); // 12561


    
    });


    // creating the bar chart for occurences in countries
    var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin;

    // title
    svg.append("text")
        .attr("transform", "translate(100,0)")
        .attr("x", 270)
        .attr("y", 50)
        .attr("font-size", "24px")
        .text("Reported Sightings Since 1906")
    
  

    var xScale = d3.scaleBand().range([0,width]).padding(0.4),
        yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g").attr("transform", "translate("+200+","+100+")");

    d3.csv("../scene1.csv").then(function(data2){
        
        xScale.domain(data2.map(function(d){return d.country;}));
        yScale.domain([0, d3.max(data2, function(d){return d.occurences;})]);

        g.append("g").attr('transform', 'translate(0,'+height+')')
                .call(d3.axisBottom(xScale))
        g.append("g").call(d3.axisLeft(yScale).tickFormat(function(d){return d;}).ticks(10));

        svg.append("line")
            .attr("x1", 650)
            .attr("y1", 700)

            .attr("x2", 800)
            .attr("y2", 500) 
            .attr("stroke", "black")
            .attr("stroke-width", 2);

        g.selectAll(".bar")
            .data(data2)
            .enter().append("rect")
            .attr("class", "bar")
            .on("mouseover", onMouseOver)
            .on('mouseout', onMouseOut)
            .attr("x", function(d){return xScale(d.country);})
            .attr("y", function(d){return yScale(d.occurences);})
            .attr("width", xScale.bandwidth())
            .attr("height", function(d){return height - yScale(d.occurences);});
        });

        // mouse over event
        function onMouseOver(d,i){
            var xPos = parseFloat(d3.select(this).attr('x')) + xScale.bandwidth() / 2
            var yPos = parseFloat(d3.select(this).attr('y'))  / 2 + height/2

            d3.select('#tooltip')
                .style('left', xPos + 'px')
                .style('top', yPos + 'px')
                .select('#occurences').text(i.occurences)
            d3.select('#tooltip').classed('hidden', false);


            d3.select(this).attr('class', 'highlight')
            d3.select(this)
                .transition()
                .duration(200)
                .attr('width', xScale.bandwidth()+5)
                .attr('y', function(d){return yScale(d.occurences) - 10;})
                .attr('height', function(d){return height - yScale(d.occurences) + 10;});
        }

        function onMouseOut(d,i){
            d3.select(this).attr('class', 'bar')
            d3.select(this)
                .transition()
                .duration(200)
                .attr('width', xScale.bandwidth())
                .attr('y', function(d){return yScale(d.occurences);})
                .attr('height', function(d){return height - yScale(d.occurences);});

                d3.select('#tooltip').classed('hidden', true);
        }
 }
