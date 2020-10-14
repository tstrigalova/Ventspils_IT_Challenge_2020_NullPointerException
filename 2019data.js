function Get2019RangeData(maxAge){
    return [
        {
            start: 0,
            end: 6,
            count: 146792
        },
        {
            start: 7,
            end: 14,
            count: 158288
        },
        {
            start: 15,
            end: 18,
            count: 71760
        },
        {
            start: 19,
            end: 24,
            count: 104244
        },
        {
            start: 25,
            end: 49,
            count: 649499
        },
        {
            start: 50,
            end: 64,
            count: 400406
        },
        {
            start: 65,
            end: maxAge,
            count: 388979
        }
    ]
}

function Get2019Data(maxAge){
    let rangeData = Get2019RangeData(maxAge);
    let result = [];
    for(let i=0;i<rangeData.length;i++){
        let len = rangeData[i].end-rangeData[i].start+1;
        let avg = Math.round(rangeData[i].count/len);
        for(let j=0;j<len;j++) result.push(avg);
    }
    return result;
}
