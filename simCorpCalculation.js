/* The scripts is for node.js ver 10.13.0 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/* Object with default agreement data */
const dataObj = {
    agreementObj: {
        agreementDate: new Date('2018-12-02'),
        calculationDate: new Date('2019-12-02'),
        investmentSum: 1000,
        yearRateValue: 15,
        yearsNum: 1
    }
}

/* calculate interest rate payments on agreement */
function calculateInterestPaymentsSum(dataObj) {
    const agreementObj = dataObj.agreementObj;
    const monthlyRateValue = agreementObj.yearRateValue / 12 / 100; // Monthly rate value
    
    const monthNum = agreementObj.yearsNum * 12; // Month number in investment agreement
    
    const annuytetCoef = ( monthlyRateValue * Math.pow (1 + monthlyRateValue, monthNum) ) / ( Math.pow (1 + monthlyRateValue, monthNum) - 1 ); //Annuyetet coefficient
    
    const annuytet = agreementObj.investmentSum * annuytetCoef; //Annuyetet monthly payment
    
    let interestRateSum = annuytet * monthNum - agreementObj.investmentSum; //Interest rate Sum
    interestRateSum = interestRateSum.toFixed(2); //rounding to hundredths
   

    console.log('Future interest payments amount: ' + interestRateSum);
}

rl.question(`Please enter following data:\n\tAgreement date in YYYY-MM-DD format,\n\tCalculation date in YYYY-MM-DD format,` +
            `\n\tInvestment sum value without currency symbols,\n\tYear Rate percentage value without percentage,` +
            `\n\tNumber of years\nas commma separated values: `, (answer) => {
    //small input values check
    let tempArr = answer.split(',');
    let numberArr = [...tempArr].splice(-3);
    if ( (typeof answer === 'string') && ( tempArr.length === 5) && ( !numberArr.some(isNaN) )  ) {
        dataObj.agreementObj = {
            agreementDate: new Date(tempArr[0]),
            calculationDate: new Date(tempArr[1]),
            investmentSum: Number(tempArr[2]),
            yearRateValue: Number(tempArr[3]),
            yearsNum: Number(tempArr[4])
        };

        console.log('You entered:', answer);
        calculateInterestPaymentsSum(dataObj);
    } else {
        console.log('Please restart program and enter correct values');
    }
    
    rl.close();
});