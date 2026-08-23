import app from "./src/app.js";
import connectToDb from './src/config/database.js'

connectToDb();

app.get("/",(req,res)=>{
    res.send("Hi i am chetan");
})

app.listen(3000,()=>{
    console.log(`Server is running`)
})