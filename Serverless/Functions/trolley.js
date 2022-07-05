const connectDB = require("@Utils");
const handler = async function(event, context) {
    let {id} = event.queryStringParameters;
    try{
    const client = await connectDB();
    const trolley = client.db("NodeApiStore").collection("Trolley");
    const newTrolley = await trolley.find({id}).toArray();
    if(event.httpMethod=="POST"){
    if(newTrolley.length == false){
        await trolley.insertOne({id});
        return({
            statusCode:200,
            body:"Inserción completada"
        })
    }
    return({
        statusCode:202,
        body:"Este carrito ya existe"
    })
    }else if(event.httpMethod=="GET"){
        let res = newTrolley.length!=false?newTrolley:0;
        return ({
            statusCode:200,
            body:JSON.stringify(res)
            }
            );
    }
    }catch(err){
        console.log(err);
    }
}

module.exports = {handler};