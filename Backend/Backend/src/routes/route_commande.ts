import { Router, Request, Response } from 'express';
import Commande from '../models/commande';
import Produit from '../models/produit';

const orderRouter = Router();


orderRouter.get('/', async (req: Request, res: Response) => {
  try {
    const commandes = await Commande.findAll({
      include: [
        {
          model: Produit,
          attributes: ['Nom', 'Prix', 'Description'], // Récupérer uniquement les champs nécessaires
        },
      ],
    });
    res.status(200).json(commandes);
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des commandes' });
  }
});


orderRouter.post('/', async (req: Request, res: Response) => {
  const commandesData = req.body;  // On suppose que le corps de la requête contient un tableau d'objets

  try {
    // Insérer les commandes dans la base de données
    await Commande.bulkCreate(commandesData);
    res.status(201).json({ message: 'Commande validée avec succès' });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la validation de la commande', error });
  }
});
export default orderRouter;
