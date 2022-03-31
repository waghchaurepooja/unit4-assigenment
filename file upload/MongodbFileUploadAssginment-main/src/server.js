
const app = require("./index");

const Connectdb = require("./configs/db")

app.listen(5600 , async(req,res)=>{
    try 
    {
        await Connectdb();

        console.log("Listening on port 5600");
    } 

    catch(error) 
    {
        return res.send("error : ", error);
    }
})