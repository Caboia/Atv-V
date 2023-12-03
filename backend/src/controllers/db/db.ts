import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  database: 'wb',
  username: 'postgres',
  password: '1234',
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;