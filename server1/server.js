const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors'); 
var mysql = require('mysql');
const levenshtein = require('js-levenshtein');
app.use(cors("*"));

app.get('/',(req,res)=> {
    try {res.send("HOME")}

    catch(error) {
        console.log(error);
    }
});

var connection = mysql.createConnection({
    // host     : 'localhost',
    // user     : 'root',
    // password : 'Royal@11011',
    // database : 'buycar',
    // port     : '3306'
    host     : 'viaduct.proxy.rlwy.net',
    user     : 'root',
    password : '-Ee21bHfabB-eDdeD62FFC5C4dbagcDH',
    database : 'railway',
    port     : '42321'
});
connection.connect();


app.get('/marketplace_inventory', async (req, res) => {
        // console.log(req.query);
        try {
                const trueColors = Object.keys(req.query.color).filter(color => req.query.color[color] === 'true');
                // console.log(trueColors.length);
                // console.log(req.query);

                if (trueColors.length===0 && req.query.car_req==="")
                {
                    await connection.query(`SELECT ALL * FROM marketplace_inventory JOIN oem_specs ON (oem_specs.vehicle_id = marketplace_inventory.vehicle_id) WHERE (price >= ${req.query.minprice || 0} AND price <= ${req.query.maxprice || 50000}) AND (mileage >= ${req.query.minmileage || 0} AND mileage <= ${req.query.maxmileage || 20})`
                    , function (error, results, fields) {
                        // console.log(results);
                        res.send(results);
                    });
                }

                else
                {
                    if (!req.query.car_req) {
                        sqlquery = `SELECT ALL * FROM marketplace_inventory JOIN oem_specs ON (oem_specs.vehicle_id = marketplace_inventory.vehicle_id) WHERE (price >= ${req.query.minprice || 0} AND price <= ${req.query.maxprice || 50000}) AND (mileage >= ${req.query.minmileage || 0} AND mileage <= ${req.query.maxmileage || 20})`;
                    }
                    
                    else {
                        sqlquery = `SELECT ALL * FROM marketplace_inventory JOIN oem_specs ON (oem_specs.vehicle_id = marketplace_inventory.vehicle_id) WHERE (price >= ${req.query.minprice || 0} AND price <= ${req.query.maxprice || 50000}) AND (mileage >= ${req.query.minmileage || 0} AND mileage <= ${req.query.maxmileage || 20}) AND CONCAT(oem_name, ' ', model_name, ' ', model_year) LIKE "%${req.query.car_req}%"`;
                    }

                    // if (trueColors.length !== 0 && (trueColors[0] !== 'All')) {
                        // console.log("hello");

                        const colorConditions = trueColors.map(color => (color === 'All') ? `1` : `color = "${color}"`).join(' OR ');
                        if (colorConditions)
                            sqlquery += ` AND (${colorConditions});`;
                    // }

                    // else {
                    //     sqlquery != `AND 1;`;
                    // }

                    // console.log(sqlquery);
                    await connection.query(sqlquery
                        , function (error, results, fields) {
                        res.send(results);
                    });
                }
        }

        catch (error) {
            console.log(error);
        }
});

app.get('/search_suggestions', async (req, res) => {
    try {
        // console.log(req.query);
        await connection.query((`SELECT CONCAT(oem_name, ' ', model_name, ' ', model_year) AS car_name FROM marketplace_inventory JOIN oem_specs ON (oem_specs.vehicle_id = marketplace_inventory.vehicle_id);`)
        , function (error, results, fields) {

            // Function to calculate Chapman Length Deviation coefficient
            function calculateChapmanDeviation(query, candidate) {
                const maxLength = Math.max(query.length, candidate.length);
                const minLength = Math.min(query.length, candidate.length);

               return (1 - ((maxLength - minLength) / maxLength));
            }

            function calculateLevenshteinDistance(query, candidate) {
                return (1 - (levenshtein(query, candidate) / Math.max(query.length, candidate.length)));
            }

            const carNames = results.map(result => result.car_name);
            const query = req.query.car_req;

            if (error) throw error;
            // console.log(carNames);
            // Calculate Chapman Length Deviation and Levenshtein Distance for each result
            const suggestions = carNames.map(carName => {
                const candidate = carName;
                const chapmanDeviation = calculateChapmanDeviation(query, candidate);
                const levenshteinDist = calculateLevenshteinDistance(query, candidate);
                return { candidate, chapmanDeviation, levenshteinDist };
            });

            // Define weights for Chapman Length Deviation and Levenshtein Distance
            const chapmanWeight = 0.3; // Adjust weights based on importance
            const levenshteinWeight = 0.7;

            // Calculate combined scores and sort suggestions
            const suggestionsWithScores = suggestions.map(suggestion => {
                const combinedScore = (chapmanWeight * suggestion.chapmanDeviation) + (levenshteinWeight * suggestion.levenshteinDist);
                return { ...suggestion, combinedScore };
            });

            // Sort based on combined score
            suggestionsWithScores.sort((a, b) => b.combinedScore - a.combinedScore);

            // Get the top 5 suggestions
            const top5Suggestions = suggestionsWithScores.slice(0, 5);

            // console.log(top5Suggestions);
            res.send(top5Suggestions);
        });
    }

    catch(error) {
        console.log(error);
    }
});

app.get('/get_oems', async (req, res) => {
    await connection.query(`SELECT COUNT(vehicle_id) AS Number_Of_Oems FROM oem_specs`, function (error, result, fields) {
        res.send(result);
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
