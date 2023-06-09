"use strict";
import { Model, UUIDV4, DataTypes, NUMBER, STRING } from "sequelize";
import { validate } from "uuid";

interface itemAtributes {
  id: string;
  name: string;
  location: string;
  price: number;
}

export default (sequelize: any) => {
  class Item extends Model<itemAtributes> implements itemAtributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    name!: string;
    location!: string;
    price!: number;
    static associate(models: any) {
      // define association here
    }
  }
  Item.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [
            [
              "Main Office",
              "Cavea Gallery",
              "Cavea Tbilisi Mall",
              "Cavea East Point",
              "Cavea City Mall",
            ],
          ],
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
