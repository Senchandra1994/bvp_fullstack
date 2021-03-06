const express = require('express');
const app  = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false})); // Parse URL Encoded
app.use(bodyParser.json()); // Parse JSON
app.use(cors());
app.use('/',require('./routes/userroutes'));
app.use('/order',require('./routes/order'));
app.use((req,res,next)=>{
    let token = req.query.token;
    const t = require('./utils/token');
    var obj = t.verifyToken(token);
    console.log('Token Rec is ',token, ' V ',obj);
    if(obj.verified && obj.userid){
        console.log('Calling Next');
        next();
    }
    else{
        res.json({token:false,code:401});
    }
});
app.use('/notes',require('./routes/noteroutes'));

app.use((req,res,next)=>{
    //res.send('OOPS U TYPE SOMETHING WRONG!!!!!');
    //const p = '/Users/amit/Documents/bvp-fullstack/webapp/public/error.html';
    const path = require('path');
    console.log('CURRENT DIR IS ',__dirname);
    const fullPath = path.join(__dirname,'/public/error.html');
    res.sendFile(fullPath);
})
app.listen(process.env.PORT || 1234 ,(err)=>{
    if(err){
        console.log('Error on Server Start');
    }
    else{
    console.log('Server is Up and Running....');
    }
});