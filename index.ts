import express from 'express';
import db from './models';
import cors from "cors";
import models from "./models"

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());

app.get('/items', async (req, res) =>{
    
    const items = await db.Item.findAll({ limit: 20 });
    res.json(items);
    console.log(items)
})

db.sequelize.sync().then(()=>{
    app.listen(port, ()=>{
        console.log(`listening to port ${port}`)
    })
})

module.exports = app;