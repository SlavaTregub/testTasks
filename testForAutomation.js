/* The scripts is for node.js ver 10.13.0 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/* Object with default temperature array and days of week names */
const dataObj = {
    temperatureArr: [30,49,45,33,43,37,44],
    daysOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
}

/* Calculate week temperature and find first day of week which temperature is closest to average
    Returs day of week number and prints name in console.
*/
function temperatureAvgNearAvg(dataObj) {
    let avgTemperature, dayOfWeekNum;
    let tempArr = dataObj.temperatureArr;
    let arrModify;
    const arrSum = arr => arr.reduce((a,b) => a + b, 0); // function to calculate array sum
    const arrMin = arr => Math.min(...arr); // function to find array min value

    avgTemperature = Math.round( (( arrSum(tempArr) / tempArr.length) * 100) / 100 );

    //create array with absolute difference between array item and average temperature
    arrModify = tempArr.map(function(item,index){
        return item = Math.abs(item - avgTemperature)
    });

    arrMinValue = arrMin(arrModify);

    dayOfWeekNum = arrModify.indexOf(arrMinValue);

    console.log(`Target day: ` + dataObj.daysOfWeek[dayOfWeekNum]);

    return dataObj.daysOfWeek[dayOfWeekNum];
}

rl.question('Please enter week temperature as comma separeted string with 7 interger values: ', (answer) => {
    //small input values check
    let tempArr = answer.split(',');
    console.log(tempArr);
    if ( (typeof answer === 'string') && (tempArr.length === 7) && (!tempArr.some(isNaN)) ) {
        dataObj.temperatureArr = tempArr.map(Number);
        console.log('You entered:', answer);
        temperatureAvgNearAvg(dataObj);
    } else {
        console.log('Please restart program and enter correct values');
    }
    
    rl.close();
});




