
let GraphId = 'TrashGraph';
let LastYear = 2120;
let LifeExpectancySliderId = "LifeExpectancySlider";
let AverageReproductionAgeSliderId = "AverageReproductionAgeSlider";
let AverageChildrenCountSliderId = "AverageChildrenCountSlider";
let EmigrationSliderId = "EmigrationSlider";
let ImigrationSliderId = "ImigrationSlider";

$(document).ready(Init);

function Init(){
    LoadGraph();
    AddBubbles();
    AddValueListeners();
}

function AddBubbles(){
    const allRanges = document.querySelectorAll(".range-wrap");

    allRanges.forEach(wrap => {
        const range = wrap.querySelector(".range");
        const bubble = wrap.querySelector(".bubble");

        range.addEventListener("input", () => {
            setBubble(range, bubble);
        });
        setBubble(range, bubble);
    });

    function setBubble(range, bubble) {
        const val = range.value;
        const min = range.min ? range.min : 0;
        const max = range.max ? range.max : 100;
        const newVal = Number(((val - min) * 100) / (max - min));
        bubble.innerHTML = val;
        bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
    }
}

function AddValueListeners(){
    AddSliderValueListener(LifeExpectancySliderId);
    AddSliderValueListener(AverageReproductionAgeSliderId);
    AddSliderValueListener(AverageChildrenCountSliderId);
    AddSliderValueListener(EmigrationSliderId);
    AddSliderValueListener(ImigrationSliderId);
}

function AddSliderValueListener(sliderId){
    const averageChildrenCountSlider = document.querySelector("#"+sliderId);
    averageChildrenCountSlider.addEventListener("input",()=>{
        AverageChildrenCount = averageChildrenCountSlider.value;
        LoadGraph();
    });
}

function GetSliderValue(sliderId){
    return document.querySelector("#"+sliderId).value;
}

function LoadGraph(){
    let graph = document.getElementById(GraphId);
    let fig = {
        data: GetTraces(),
        layout: GetLayout()
    }
    Plotly.newPlot(graph, fig);
}

function GetNextPopulationData(previousYearData){
    for(let i=GetSliderValue(LifeExpectancySliderId);i>=1;i--){
        previousYearData[i]=previousYearData[i-1];
    }
    previousYearData[0]=Math.round((previousYearData[GetSliderValue(AverageReproductionAgeSliderId)]/2)*GetSliderValue(AverageChildrenCountSliderId));
    return previousYearData;
}

function GetTotalPopulation(data){
    let result = 0;
    for(let i=0;i<data.length;i++){
        result += data[i];
    }
    return result;
}

function GetTraces(){
    let population = [];
    let x = [];

    data = Get2019Data(GetSliderValue(LifeExpectancySliderId));

    for(let i=2020;i<=LastYear;i++){
        x.push(i);
        population.push(GetTotalPopulation(data));
        data = GetNextPopulationData(data);
    }

    let populationTrace = {
        x: x,
        y: population,
        mode: 'lines'
    }
    return [populationTrace];
}


function GetLayout(){
    let title = {
        text:'Predicted population depending on given factors.',
        font: {
            family: 'Courier New, monospace',
            size: 24
        },
        xref: 'paper',
        x: 0.05
    };
    let xaxis = {
        title: {
            text: 'Time',
            font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#7f7f7f'
            }
        },
        fixedrange: true
    };
    let yaxis = {
        title: {
            text: 'Population',
            font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#7f7f7f'
            }
        },
        fixedrange: true
    };
    return layout = {
        autosize: true,
        title: title,
        xaxis: xaxis,
        yaxis: yaxis
    }
}