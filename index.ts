import express from "express";
import db from "./models";
import cors from "cors";

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

const PAGE_SIZE = 20;

app.get("/inventory/:page", async (req, res) => {
  const { page } = req.params;
  const { locationName, columnName, order } = req.query;
  const itemsInfo = await db.Item.findAndCountAll({
    where: {
      ...(locationName ? { location: locationName } : {}),
    },
    ...(columnName && order ? { order: [[columnName, order]] } : {}),
    limit: PAGE_SIZE,
    offset: PAGE_SIZE * (parseInt(page) - 1),
  });
  res.json(itemsInfo);
});

app.post("/inventory", async (req, res) => {
  const { location, name, price } = req.body;

  try {
    const result = await db.Item.create({ location, name, price });
    res.json(result);
  } catch (error) {
    res.status(400);
  }
});

app.delete("/inventory/:id", async (req, res) => {
  const { id } = req.params;
  await db.Item.destroy({ where: { id } });
  res.send();
});

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`listening to port ${port}`);
  });
});

module.exports = app;
