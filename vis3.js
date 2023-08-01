function openScene2(){
    window.open('scene2.html');
}
function openScene0(){
    window.open('index.html');
}

let selectedStartYear = "all";
let selectedEndYear = "all";

function main3(){


    function updateScatterPlot() {
        selectedStartYear = document.getElementById("startYear").value;
        selectedEndYear = document.getElementById("endYear").value;
        d3.csv("complete.csv").then(processCSVData);
    }

    // function processCSVData(data) {

    //     // Parse the datetime string and extract the year
    //     const yearsArray = data.map(function(d) {
    //         const parsedDate = d3.timeParse("%m/%d/%Y %H:%M")(d.datetime);
    //         return parsedDate.getFullYear();
    //     });
    
        
    //     console.log(yearsArray);

    //     const countsArray = countUniqueYears(yearsArray);

       
    //     console.log(countsArray);
        
    //     const filteredCountsArray = countsArray.filter(d => {
    //         const year = d.year;
    //         return (selectedStartYear === "all" || year >= selectedStartYear) &&
    //                (selectedEndYear === "all" || year <= selectedEndYear);
    //     });

    //     // creating the scatter plot
    //     const svg = d3.select("#scatterPlot")
    //         .append("svg")
    //         .attr("width", 600)
    //         .attr("height", 400);

    //     const xScale = d3.scaleLinear()
    //         .domain([1900, 2020]) 
    //         .range([50, 550]); 

    //     const yScale = d3.scaleLinear()
    //         .domain([0, d3.max(countsArray, d => d.count)]) 
    //         .range([350, 20]); 

    //     // Draw the scatter plot points
    //     svg.selectAll("circle")
    //         .data(countsArray)
    //         .enter()
    //         .append("circle")
    //         .attr("cx", d => xScale(d.year))
    //         .attr("cy", d => yScale(d.count))
    //         .attr("r", 3)
    //         .attr("fill", "steelblue");

    //     // Draw the x-axis
    //     const xAxis = d3.axisBottom(xScale)
    //         .tickFormat(d3.format("d")) 
    //         .tickValues(d3.range(1900, 2025, 10)); 

    //     svg.append("g")
    //         .attr("transform", "translate(0, 350)") 
    //         .call(xAxis);

    //     // Draw the y-axis
    //     const yAxis = d3.axisLeft(yScale);

    //     svg.append("g")
    //         .attr("transform", "translate(50, 0)") 
    //         .call(yAxis);


        
    // }

    function processCSVData(data) {
        // Parse the datetime string and extract the year
        const yearsArray = data.map(function(d) {
            const parsedDate = d3.timeParse("%m/%d/%Y %H:%M")(d.datetime);
            return parsedDate.getFullYear();
        });
    
        const countsArray = countUniqueYears(yearsArray);
    
        const filteredCountsArray = countsArray.filter(d => {
            const year = d.year;
            return (selectedStartYear === "all" || year >= selectedStartYear) &&
                   (selectedEndYear === "all" || year <= selectedEndYear);
        });
    
        // creating the scatter plot
        const svg = d3.select("#scatterPlot")
            .selectAll("svg") // Use selectAll to clear the previous scatter plot before redrawing
            .data([filteredCountsArray])
            .join("svg") // Join the new data to the SVG elements
            .attr("width", 600)
            .attr("height", 400);
    
        const xScale = d3.scaleLinear()
            .domain([1900, 2020]) 
            .range([50, 550]);
    
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(filteredCountsArray, d => d.count)]) 
            .range([350, 20]);
    
        // Draw the scatter plot points
        svg.selectAll("circle")
            .data(filteredCountsArray)
            .join("circle") // Join the new data to the circle elements
            .attr("cx", d => xScale(d.year))
            .attr("cy", d => yScale(d.count))
            .attr("r", 3)
            .attr("fill", "steelblue");
    
        // Draw the x-axis
        const xAxis = d3.axisBottom(xScale)
            .tickFormat(d3.format("d")) 
            .tickValues(d3.range(1900, 2025, 10));
    
        svg.append("g")
            .attr("transform", "translate(0, 350)") 
            .call(xAxis);
    
        // Draw the y-axis
        const yAxis = d3.axisLeft(yScale);
    
        svg.append("g")
            .attr("transform", "translate(50, 0)") 
            .call(yAxis);
    }
    
    

    // function to get the count of sightings for each year
    function countUniqueYears(yearsArray) {
        const counts = {};
        yearsArray.forEach(function(year) {
            counts[year] = (counts[year] || 0) + 1;
        });

        
        return Object.entries(counts).map(([year, count]) => {
            return { year: Number(year), count };
        });
    }


    
    d3.csv("complete.csv").then(processCSVData);

}

