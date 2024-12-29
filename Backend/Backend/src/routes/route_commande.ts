import { Router, Request, Response } from 'express';
import Commande from '../models/commande';
import Produit from '../models/produit';

const orderRouter = Router();

/**
 * @swagger
 * /api/orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get all orders
 *     description: Retrieve all orders with associated product details.
 *     responses:
 *       200:
 *         description: Orders retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID_Commande:
 *                     type: integer
 *                   ID_Produit:
 *                     type: integer
 *                   Nombre:
 *                     type: integer
 *                   Date:
 *                     type: string
 *                     format: date-time
 *                   Produit:
 *                     type: object
 *                     properties:
 *                       Nom:
 *                         type: string
 *                       Prix:
 *                         type: number
 *                       Description:
 *                         type: string
 *       500:
 *         description: Internal server error.
 */
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

/**
 * @swagger
 * /api/orders:
 *   post:
 *     description: Valide la commande en enregistrant les produits dans la base de données
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 ID_Produit:
 *                   type: integer
 *                 Nombre:
 *                   type: integer
 *                 Date:
 *                   type: string
 *                   format: date
 *     responses:
 *       201:
 *         description: Commande validée
 *       400:
 *         description: Erreur lors de la validation de la commande
 */
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
