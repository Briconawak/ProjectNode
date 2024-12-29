import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Produit extends Model {
  public ID_Produit!: number;
  public Nom!: string;
  public Description?: string;
  public Type!: string;
  public Prix!: number;
  public Prix_Promo?: number;
}

Produit.init(
  {
    ID_Produit: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Nom: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING(500),
    },
    Type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Prix: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Prix_Promo: {
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize,
    tableName: 'Produit',
    timestamps: false,
  }
);

export default Produit;
