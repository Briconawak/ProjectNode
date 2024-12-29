import express, { Request, Response } from 'express';
import Product from '../models/produit';
import Commande from '../models/commande';
import sequelize from '../config/database';


const productRouter = express.Router();


productRouter.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des produits' });
  }
});


productRouter.get('/:id/stats', async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    const commandes = await Commande.findAll({
      where: { ID_Produit: productId },
      attributes: [
        [sequelize.fn('DATE', sequelize.col('Date')), 'Date'],
        [sequelize.fn('SUM', sequelize.col('Nombre')), 'Nombre']
      ],
      group: [sequelize.fn('DATE', sequelize.col('Date'))],
      order: [[sequelize.fn('DATE', sequelize.col('Date')), 'ASC']]
    });

    res.json(commandes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des statistiques', error });
  }
});
export default productRouter;
