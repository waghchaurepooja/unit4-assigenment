
const app = require("./index");

const Connectdb = require("./configs/db");

app.listen(4400, async() =>
{
    try
    {
        Connectdb();

        console.log("lestening on port 4400");
    }
    catch(error)
    {
        console.log("error : ", error);
    }
});