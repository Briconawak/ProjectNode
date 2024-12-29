import Produit from './produit';
import Commande from './commande';

const initializeModels = () => {
  Produit.hasMany(Commande, { foreignKey: 'ID_Produit', onDelete: 'CASCADE' });
  Commande.belongsTo(Produit, { foreignKey: 'ID_Produit' });
};

export default initializeModels;
