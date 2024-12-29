import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Produit from './produit';

class Commande extends Model {
  public ID_Commande!: number;
  public ID_Produit!: number;
  public Nombre!: number;
  public Date!: Date;
}

Commande.init(
  {
    ID_Commande: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ID_Produit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Produit,
        key: 'ID_Produit',
      },
    },
    Nombre: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    Date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'Commande',
    timestamps: false,
  }
);

Commande.belongsTo(Produit, { foreignKey: 'ID_Produit' });

export default Commande;
