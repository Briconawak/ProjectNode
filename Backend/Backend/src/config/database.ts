import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('projet_node_db', 'projet_node_user', '1234', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie !');
  })
  .catch((error) => {
    console.error('Impossible de se connecter à la base de données :', error);
  });

export default sequelize;
