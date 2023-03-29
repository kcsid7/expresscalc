const express = require("express");

const ExpressError = require("./expressError");

const { inputValidation, meanCalculator, modeCalculator, medianCalculator } = require("./utils");

const app = express();

app.use(express.json());

const PORT = 3000;



app.get("/", function(req, res, next) {

    console.log("Hello World From Console!");
    res.send({
        result: "Hello World!"
    })
})


app.get("/mean", function(req, res, next) {

    const vals = req.query.nums; // Get the input values from the "nums" query as a string

    // Throw error if no inputs are provided
    if (!vals) throw new ExpressError(`Input query "nums" must be provided as comma separated numbers`);
    
    // Verify if the input values are valid numbers
    const calcInput = inputValidation(vals);
    if (calcInput instanceof Error) throw new ExpressError(calcInput.message);

    // Find the mean
    const meanRes = meanCalculator(calcInput);
    
    res.send({
        operation: "Mean",
        result: meanRes
    })

})

app.get("/median", function(req, res, next) {

    const vals = req.query.nums; // Get the input values from the "nums" query as a string

    // Throw error if no inputs are provided
    if (!vals) throw new ExpressError(`Input query "nums" must be provided as comma separated numbers`);
    
    // Verify if the input values are valid numbers
    const calcInput = inputValidation(vals);
    if (calcInput instanceof Error) throw new ExpressError(calcInput.message);

    // Find the mean
    const medianRes = medianCalculator(calcInput);
    
    res.send({
        operation: "Median",
        result: medianRes
    })

})

app.get("/mode", function(req, res, next) {

    const vals = req.query.nums; // Get the input values from the "nums" query as a string

    // Throw error if no inputs are provided
    if (!vals) throw new ExpressError(`Input query "nums" must be provided as comma separated numbers`);
    
    // Verify if the input values are valid numbers
    const calcInput = inputValidation(vals);
    if (calcInput instanceof Error) throw new ExpressError(calcInput.message);

    // Find the mode
    const modeRes = modeCalculator(calcInput);
    
    res.send({
        operation: "Mode",
        result: modeRes
    })
})


app.get("/all", function(req, res, next) {
    const vals = req.query.nums;

    if (!vals) throw new ExpressError(`Input query "nums" must be provided as comma separated numbers`)

    const calcInput = inputValidation(vals);
    if (calcInput instanceof Error) throw new ExpressError(calcInput.message);

    res.send({
        operation: "All (Mean, Mode, Median)",
        result: {
            mean: meanCalculator(calcInput),
            mode: modeCalculator(calcInput),
            median: medianCalculator(calcInput)
        }
    })
    
})


// General Error Handler
app.use(function(req, res, next) {
    const err = new ExpressError("Page Not Found", 404);
    return next(err);
})

app.use(function(err, req, res, next) {
    res.status(err.status || 500);

    return res.json({
        error: err
    })
})

// Server Listening
app.listen(PORT, function() {
    console.log(`Alive on port: ${PORT}`)
})

