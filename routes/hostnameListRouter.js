const express = require('express');
const connection = require('../config/database');
const router = express.Router();


router.get('/hostnameList',(req,res) => {
    hostnameListQuery = "SELECT * FROM hostname";
    connection.query(hostnameListQuery,(err, result,fields) => {
        res.status(200).json({
            body:{
                "result": result
            }
        });
    });
});

module.exports = router;