function inputValidation(nums) {
    // nums is a string of comma separated input values that will be converted into numbers
    // result is an array of numbers
    const arrNums = nums.split(",");
    const result = [];

    for (let i = 0; i < arrNums.length; i++) {
        let num = Number(arrNums[i]);
        if (Number.isNaN(num)) {
            return new Error(`${arrNums[i]} is not a valid number!`)
        }
        result.push(num);
    }
    return result;
}


function counter(arr) {
    // Given an array, create an frequency counter object with that array
    const result = {};
    for (let i = 0; i < arr.length; i++) {
        result[arr[i]] = (result[arr[i]] || 0) + 1
    }
    return result;
}


function meanCalculator(nums) {
    // nums is an array of numbers
    if (nums.length === 0 ) return 0;
    const sum = nums.reduce((accum, curVal) => accum + curVal );
    return sum / nums.length
}

function modeCalculator(nums) {
    const freqObj = counter(nums); // Creates the frequency counter object 
    
    let maxVal, currMax = 0;

    // For each key in the frequency counter object, check its value and find the highest value key
    for (let key in freqObj) {
        if (freqObj[key] > currMax) {
            currMax = freqObj[key];
            maxVal = key;
        }
    }

    return maxVal;
}


function medianCalculator(nums) {
    // Sort the arrays in ascending order
    const sortedArr = [...nums].sort((a, b) => a - b);

    const middle = Math.floor(sortedArr.length / 2);
    
    const medAvg = (n1, n2) => (n1 + n2) / 2;

    // sorted array length === odd ? the middle index value will be the median
    // sorted array length === even ? the two middle index values will be averaged for the median
    if (sortedArr.length % 2 !== 0) {
        return sortedArr[middle];
    } else {
        return medAvg(sortedArr[middle], sortedArr[middle - 1])
    }
}


module.exports = {
    inputValidation,
    meanCalculator,
    modeCalculator,
    medianCalculator
}