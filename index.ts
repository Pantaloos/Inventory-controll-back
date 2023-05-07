import express from 'express';
import db from './models';
import cors from "cors";

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.get('/items', async (req, res) =>{
    const items = await db.Item.findAll({ limit: 1000 });
    res.json(items);
    console.log(items)
})

app.post('/items', async (req, res) =>{
    console.log(req)
    const {location, name, price} = req.body;
    await db.Item.create({location, name, price });
});

app.delete('/items/:id',async (req, res) => {
    const {id} = req.params;
    await db.Item.destroy({where:{id}});
    res.send();
})

db.sequelize.sync().then(()=>{
    app.listen(port, ()=>{
        console.log(`listening to port ${port}`)
    })
})

module.exports = app;