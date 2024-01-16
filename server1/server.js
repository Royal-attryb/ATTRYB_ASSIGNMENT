const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors'); 
var mysql = require('mysql');

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
                if (req.query.color === 'All' || !req.query.color)
                {
                    await connection.query(`SELECT ALL * FROM marketplace_inventory JOIN oem_specs ON (oem_specs.vehicle_id = marketplace_inventory.vehicle_id) WHERE (price >= ${req.query.minprice || 0} AND price <= ${req.query.maxprice || 50000}) AND (mileage >= ${req.query.minmileage || 0} AND mileage <= ${req.query.maxmileage || 20});`
                    , function (error, results, fields) {
                        // console.log(results);
                        res.send(results);
                    });
                }

                else
                {
                    await connection.query(`SELECT ALL * FROM marketplace_inventory JOIN oem_specs ON (oem_specs.vehicle_id = marketplace_inventory.vehicle_id) WHERE color="${req.query.color}" AND (price >= ${req.query.minprice || 0} AND price <= ${req.query.maxprice || 50000}) AND (mileage >= ${req.query.minmileage || 0} AND mileage <= ${req.query.maxmileage || 20});`
                    , function (error, results, fields) {
                        res.send(results);
                    });
                }
        }

        catch (error) {
            console.log(error);
        }
});

app.get('/get_car', async(req, res) => {
    // console.log(req.query);
    if (req.query.car_req !=='')
    {
    try {
        await connection.query(`SELECT ALL * FROM marketplace_inventory JOIN oem_specs ON (oem_specs.vehicle_id = marketplace_inventory.vehicle_id) WHERE CONCAT(oem_name, ' ', model_name, ' ', model_year) = "${req.query.car_req}"`, function (error, result, fields) {
            res.send(result);
        });
    }

    catch (error) {
        console.log(error);
    }
    }

    else
    {
    try {
        await connection.query(`SELECT ALL * FROM marketplace_inventory JOIN oem_specs ON (oem_specs.vehicle_id = marketplace_inventory.vehicle_id) WHERE 1`, function (error, result, fields) {
            res.send(result);
        });
    }

    catch (error) {
        console.log(error);
    }
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