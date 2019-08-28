const express = require('express');
const connection = require('../config/database');
const router = express.Router();

months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
weekday = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
router.post('/details',(req,res) => {
    let {person = 12, head=200, startDate= new Date() } = req.body;
    arr = [];
    start = new Date(startDate);
    getLastMonth = new Date(start.getFullYear(),start.getMonth() + parseInt(person), start.getDate());

    for(let month=1;month<=person;month++){
        date = new Date(start.getFullYear(),start.getMonth() + month, start.getDate());
        obj = {
            month: month,
            payment_date : weekday[date.getDay()] + ", " + date.getDate() + " " + months[date.getMonth()] + " "  + "["+ (new Date(date).getMonth() +1) +  "]" + " " + date.getFullYear()
        }
        arr.push(obj);
    }
    res.status(200).json({
        body:{
            person: person,
            head: head,
            firstPayment: head, 
            startDate: weekday[start.getDay()] + ", " + start.getDate() + " " + months[start.getMonth()] + "["+ (new Date(start).getMonth()+1) +"]" + " " + start.getFullYear(),
            endDate: weekday[getLastMonth.getDay()] + ", " + getLastMonth.getDate() + " " + months[getLastMonth.getMonth()] + "["+ (new Date(getLastMonth).getMonth()+1) +"]" + " " + getLastMonth.getFullYear(),
            details: arr
        }
    });
});
router.get('/payment/add',(req,res)=> {
   let { rate, paid_date } = req.body; 
   head = 200;
   payment = head - rate;

//    paid_date = new Date(paid_date);
//    pd = new Date(paid_date.getFullYear(),paid_date.getMonth(),paid_date.getDate());

   insertQuery = `INSERT INTO monthly_payment(rate,head,payment,paid_date) VALUES(${rate},${head},${payment},'${paid_date}')`;
   connection.query(insertQuery,(err, result, fields) => {
       if(err){
        res.status(500).json({
            body:{
                "error": err
            }
           });
       }
       res.status(200).json({
        body:{
            "result": result
        }
       });
   })
   
});

router.get('/getAllpayment',(req,res)=> {
    getQuery = `SELECT * FROM monthly_payment`;
    connection.query(getQuery,(err, result, fields) => {
        if(err){
         res.status(500).json({
             body:{
                 "error": err
             }
            });
        }
        total = 0;
        total_head = 0;
        result.forEach((res,index) => {
            total_head+=res.head;
            total+= res.payment;
        });
        console.log(total);
        res.status(200).json({
         body:{
             "result": result,
             "total_paid": `${total}$ for ${result.length} Months, Current Profit is ${total_head - total}$`
         }
        });
    })
    
 });

module.exports = router;