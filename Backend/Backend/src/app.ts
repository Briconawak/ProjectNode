import express, { Application } from 'express';
import swaggerUi from "swagger-ui-express";
import sequelize from "./config/database";
import swaggerDoc from "./config/swagger";
import productRouter from "./routes/route_produit";
import orderRouter from "./routes/route_commande";
import initializeModels from './models/associations';
import Produit from './models/produit';
import Commande from './models/commande';
import { json } from 'body-parser';
import swaggerJsdoc from 'swagger-jsdoc';

initializeModels();
const app: Application = express();

// Middleware pour parser les données JSON dans les requêtes
app.use(json());

// Configuration Swagger
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API Example',
      version: '1.0.0',
      description: 'API Documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.ts'],  // Chemin vers les fichiers de route contenant les annotations Swagger
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Route pour afficher la documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/api/products", productRouter);  // Modifier le préfixe
app.use("/api/orders", orderRouter);      // Modifier le préfixe

console.log("starting...");
app.listen(3000, () => {
  console.log("Ok, started port 3000, please open http://localhost:3000/api-docs");
});

(async () => {
  try {
    // Synchronizer les modèles avce la database
    await sequelize.sync({ force: true });

    // Insertion des produits
    const produitsData = [
      { Nom: 'Football', Description: 'Official size and weight football for matches.', Type: 'Sport', Prix: 25.99, Prix_Promo: 18.99 },
      { Nom: 'Basketball', Description: 'Durable outdoor basketball.', Type: 'Sport', Prix: 30.99, Prix_Promo: 24.99 },
      { Nom: 'Tennis Ball Pack', Description: 'Pack of 3 high-quality tennis balls.', Type: 'Sport', Prix: 10.99, Prix_Promo: 8.99 },
      { Nom: 'Running Shoes', Description: 'Lightweight running shoes.', Type: 'Footwear', Prix: 60.00, Prix_Promo: 45.00 },
      { Nom: 'Cycling Helmet', Description: 'High safety-rated cycling helmet.', Type: 'Accessory', Prix: 40.00, Prix_Promo: 30.00 },
      { Nom: 'Yoga Mat', Description: 'Non-slip yoga mat.', Type: 'Fitness', Prix: 20.00, Prix_Promo: 15.00 },
      { Nom: 'Dumbbells', Description: 'Set of two 10kg dumbbells.', Type: 'Fitness', Prix: 50.00, Prix_Promo: 40.00 },
      { Nom: 'Skipping Rope', Description: 'Durable and adjustable skipping rope.', Type: 'Fitness', Prix: 8.99, Prix_Promo: 6.99 },
      { Nom: 'Baseball Bat', Description: 'Aluminum baseball bat.', Type: 'Sport', Prix: 35.00, Prix_Promo: 25.00 },
      { Nom: 'Swimming Goggles', Description: 'Anti-fog and UV-protected goggles.', Type: 'Swimming', Prix: 12.99, Prix_Promo: 9.99 },
    ];

    const produits = await Produit.bulkCreate(produitsData);

    // Insertions des commandes
    const commandesData = [
      { ID_Produit: produits[0].ID_Produit, Nombre: 2, Date: new Date() },
      { ID_Produit: produits[1].ID_Produit, Nombre: 1, Date: new Date() },
      { ID_Produit: produits[2].ID_Produit, Nombre: 3, Date: new Date() },
      { ID_Produit: produits[3].ID_Produit, Nombre: 1, Date: new Date() },
      { ID_Produit: produits[4].ID_Produit, Nombre: 2, Date: new Date() },
      { ID_Produit: produits[5].ID_Produit, Nombre: 4, Date: new Date() },
      { ID_Produit: produits[6].ID_Produit, Nombre: 1, Date: new Date() },
      { ID_Produit: produits[7].ID_Produit, Nombre: 3, Date: new Date() },
      { ID_Produit: produits[8].ID_Produit, Nombre: 2, Date: new Date() },
      { ID_Produit: produits[9].ID_Produit, Nombre: 5, Date: new Date() },
    ];

    await Commande.bulkCreate(commandesData);

    console.log("10 produits et commandes insérés avec succès.");
  } catch (error) {
    console.error("Erreur lors de l'insertion des données :", error);
  }
})();
