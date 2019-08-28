const express = require('express'); 
 const bdps = require('body-parser'); 
 const app = express(); 
 const paymentRouter = require('./routes/paymentRouter'); 
 const hostnameListRouter = require('./routes/hostnameListRouter'); 
 const swaggerUi = require('swagger-ui-express'), swaggerDoc = require('./api/swagger/swagger.json'); 
 const PORT = 3001; 
 // parse with form-data 
 app.use(bdps.urlencoded({extended: false})); 
 // parse with application/JSON 
 app.use(bdps.json()); 
 // setup swagger 
 app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDoc));
 app.get('/api/v1/api-docs',(req,res) => { 
    res.send(swaggerDoc); 
 }); 
 app.use('/api', paymentRouter); 
 app.use('/api', hostnameListRouter); 
 app.listen(PORT,() => console.log(`server.js is listening on port ${PORT}`));
