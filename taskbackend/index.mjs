import connectDB from './db.js';
import cors from 'cors'
import express from 'express';
import dotenv from 'dotenv';
import router from './routes/auth.js';
import trouter from './routes/tasks.js';

dotenv.config()
//connecting to database
connectDB()

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","*");

    if(req.method=="OPTIONS"){
        res.header("Access-Control-Allow-Methods","POST, PUT, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
app.use('/api/auth.js', router);
app.use('/api/tasks.js', trouter);
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions))

app.listen(port, () => {
    console.log(`listening to the port ${port}`);
})