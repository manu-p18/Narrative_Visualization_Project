function openScene3(){
    window.open('scene3.html');
}
function openScene1(){
    window.open('scene1.html');
}

 function main2(){


    const shape_col = 'shape';
    
    
    d3.csv('complete.csv').then(function(data1)  {
        
        const all_shapes = data1.map(d => d[shape_col]);

        // Print the variable to see its contents
        console.log(all_shapes);

        // Count the occurrences of 'light'
        occurrencesOfLight = all_shapes.reduce((count, shape) => {
            return count + (shape === 'light' ? 1 : 0);
        }, 0);

        // Count the occurrences of 'triangle'
        occurrencesOfTriange = all_shapes.reduce((count, shape) => {
            return count + (shape === 'triangle' ? 1 : 0);
        }, 0);

        // occurences of fireball shape
        occurrencesOfFireball = all_shapes.reduce((count, shape) => {
            return count + (shape === 'fireball' ? 1 : 0);
        }, 0);
    
        // Count the occurrences of flash
        occurrencesOfFlash = all_shapes.reduce((count, country) => {
            return count + (country === 'flash' ? 1 : 0);
        }, 0);

        // Count the occurrences of sphere
        occurrencesOfSphere = all_shapes.reduce((count, shape) => {
            return count + (shape === 'sphere' ? 1 : 0);
        }, 0);

        // Count the occurrences of null rows
        occurrencesOfOval = all_shapes.reduce((count, shape) => {
            return count + (shape === 'oval' ? 1 : 0);
        }, 0);

        occurrencesOfDisk = all_shapes.reduce((count, shape) => {
            return count + (shape === 'disk' ? 1 : 0);
        }, 0);

        occurrencesOfCircle = all_shapes.reduce((count, shape) => {
            return count + (shape === 'circle' ? 1 : 0);
        }, 0);

        occurrencesOfCigar = all_shapes.reduce((count, shape) => {
            return count + (shape === 'cigar' ? 1 : 0);
        }, 0);

        occurrencesOfDiamond = all_shapes.reduce((count, shape) => {
            return count + (shape === 'diamond' ? 1 : 0);
        }, 0);

        occurrencesOfChanging = all_shapes.reduce((count, shape) => {
            return count + (shape === 'changing' ? 1 : 0);
        }, 0);

        occurrencesOfOther = all_shapes.reduce((count, shape) => {
            return count + (shape !== 'cigar' && shape !== 'circle' && shape !== 'disk' && shape !== 'oval' && shape !== 'sphere' 
                            && shape !== 'flash'  && shape !== 'fireball' && shape !== 'triangle' && shape !== 'light'  
                            && shape !== 'diamond' && shape !== 'changing' ? 1 : 0);
        }, 0);

        // Print the count. then putting it into csv scene2.csv
        console.log("Occurrences of 'light':", occurrencesOfLight); // 17872
        console.log("Occurrences of 'triangle':", occurrencesOfTriange); // 8489
        console.log("Occurrences of 'fireball':", occurrencesOfFireball); // 6562
        console.log("Occurrences of 'flash':", occurrencesOfFlash); // 1472
        console.log("Occurrences of 'sphere':", occurrencesOfSphere); // 5755
        console.log("Occurrences of 'oval':", occurrencesOfOval); // 4119
        console.log("Occurrences of 'disk':", occurrencesOfDisk); // 6005
        console.log("Occurrences of 'circle':", occurrencesOfCircle); // 8453
        console.log("Occurrences of 'cigar':", occurrencesOfCigar); // 2241
        console.log("Occurrences of 'diamond':", occurrencesOfDiamond); // 1308
        console.log("Occurrences of 'changing':", occurrencesOfChanging); // 2140
        console.log("Occurrences of 'other':", occurrencesOfOther); // 24459

    });

        var svg = d3.select('svg'),
        width = svg.attr('width'),
        height = svg.attr('height'),
        radius = Math.min(width, height) / 2;

        var g = svg.append('g')
                .attr('transform', 'translate('+width / 2 + ',' + height / 2 + ')');


        var color = d3.scaleOrdinal(['#0000FF', '#1E90FF', '#00BFFF', '#87CEFA', '#4682B4', 
                                    '#6495ED', '#7B68EE', '#000080', '#0000CD', '#00008B', '#191970', '#4169E1'])
        var pie = d3.pie().value(function(d){
            return d.frequency;
        })
        var path = d3.arc()
            .outerRadius(radius - 20)
            .innerRadius(0);

        var label = d3.arc()
            .outerRadius(radius)
            .innerRadius(radius - 200);
    
        d3.csv('../scene2.csv').then(
         function(data){
            var arc = g.selectAll('.arc')
                .data(pie(data))
                .enter().append('g')
                .attr('class', 'arc');
            arc.append('path')
                .attr('d', path)
                .attr('fill', function(d){return color(d.data.shape);})
                .on('mouseover', function(event, d) {


                
                
                

                    // Show the tooltip on mouseover
                    var tooltip = svg.append('g')
                                     .attr('class', 'tooltip')
                                     .style('pointer-events', 'none');
    
                    var tooltipBox = tooltip.append('rect')
                                           .attr('class', 'tooltip-box')
                                           .attr('width', 310) // Set the width of the tooltip box
                                           .attr('height', 200) // Set the height of the tooltip box
                                           .attr('x', 0) // Adjust the x position of the box
                                           .attr('y', height / 2 - 40); // Adjust the y position of the box
    
                    var tooltipText = tooltip.append('text')
                                            .attr('class', 'tooltip-text')
                                            .attr('x', 30) // Adjust the x position of the text
                                            .attr('y', height / 2) // Adjust the y position of the text
                                            .text("Shape: " + d.data.shape );
    
                    tooltipText.append('tspan')
                    .attr('x', 30) // Adjust the x position of the additional text
                    .attr('dy', 20) // Adjust the y position of the additional text
                    .text("Sightings: " + d.data.frequency);
    
                   
                })
                .on('mouseout', function(event, d) {
                    // Hide the tooltip on mouseout
                    svg.select('.tooltip').remove();
                });






            arc.append('text')
                .attr('transform', function(d){return 'translate(' + label.centroid(d) + ')';})
                .text(function(d){return d.data.shape})
            
            svg.append('g')
                .attr('transform', 'translate(' + (width/2 - 40) + ',' + 30 + ')')
                .append('text')
                .text('UFO Shapes')
                .attr('class', 'title')
                .attr('font-weight', 'bold')
         }
        )
    





 }
