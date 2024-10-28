import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongooseConnection from "./mongo.js";
import Test from "./schemas/testSchema.js";

const port =  4000;

const corsOrigin = "*";

const app = express();

mongooseConnection();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: corsOrigin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.post("/createDoc",async (req,res) => {

    try {
        const {name, age, standard , gender} = req.body;

        if(!name){
            console.log("No name recieved");
            return res.status(400).json({
                success:false,
                msg:"No name recieved"
            })
        }

        let doc = await Test.findOne({name});
        if(doc){
            console.log("Name already exists");
            return res.status(400).json({
                success:false,
                msg:"Name already exists"
            })
        }


        let testtDoc = new Test();
        testtDoc.name = name;
        testtDoc.age = age;
        testtDoc.class = standard;
        testtDoc.gender = gender;
    
        testtDoc = await testtDoc.save();
    
        return res.status(200).json(
            {
                success:true,
                msg:"Document created",
                testtDoc
            }
        )
    } catch (error) {
        console.log(error.code);
        return res.status(500).json({
            success:false,
            msg:"Internal Server Error"
        })
    }


})

app.get("/id/:id",async (req,res) => {
    try {
        const {id} = req.params;

        const testDoc = await Test.findById(id);

        return res.status(200).json({
            success:true,
            testDoc
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, error:error.message})
    }
})

app.get("/getAll", async (req,res) => {
    try {
        const users = await Test.find({});

        return res.status(200).json({
            success:true,
            users
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
})

app.get("/getByClass", async(req,res) => {
    try {
        const {standard} = req.query;
    
        const users = await Test.find({class:standard});
    
        return res.status(200).json({
            success:true,
            users
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }

})

app.post("/update/:id",async (req,res) => {
    try {
        const {id} = req.params;
        const {name,age,standard,gender} = req.body;

        let testDoc = await Test.findById(id);

        if(!testDoc){
            console.log("Invalid id recieved");
            return res.status(400).json({
                success:false,
                msg:"Invalid id recieved"
            })
        }

        testDoc.name = name;
        testDoc.age = age;
        testDoc.class =standard;
        testDoc.gender = gender;

        testDoc = await testDoc.save();

        return res.status(200).json({
            success:true,
            testDoc
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
})

app.get("/test", (req,res) => {
    return res.status(200).json({msg:"Gaadi waala aaya ghar se kachda nikaal"});
})

app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})