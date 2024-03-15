const express = require("express")
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");
require('dotenv').config();
const connectDB = require("./db")
PORT = 4000

app.use(cors({
    origin: ['http://localhost:4200','http://localhost:4200/'],
  }));
 
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`connected http://localhost:${PORT}`);
    })
})
.catch(err => {
    console.error("error connecting to database",err);
});


const signup = require("./routes/signup");
const login = require("./routes/login");
const taskRouter = require("./routes/Task/task");

app.get("/",(req,res)=>{
    res.json({message:"Api is Running"})
})

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use("/api",taskRouter);
app.use("/api/signup",signup);
app.use("/api/signin",login);

app.use((err,req,res,next)=>{
console.error(err);
res.status(500).json({error:"Internal server error"});
})

