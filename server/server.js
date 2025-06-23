import dotenv from "dotenv"
import express, { urlencoded } from "express"
import connectToDb from './db/connect.db.js'
import cors from "cors"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000 ;

//middleware
app.use(cors());
app.use(express.json());
app.use(urlencoded({extended:false}));



//routes
app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log(`Server is running on ${process.env.PORT}`);
});


//controller routes 


//connect to DB
connectToDb()
.then(
    app.listen(process.env.PORT || 8080 , () => {
        console.log(`MongoDB connection placed : http://localhost:${process.env.PORT}`)
    })
)
.catch(
    (error) => console.log("MongoDB connection failed", error)
)