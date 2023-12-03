import { Sequelize, Model, DataTypes } from 'sequelize';
import ClienteModel from '../../../models/cliente';
import ProdutoModel from '../../../models/produto';

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

const Client = ClienteModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    genero: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, modelName: 'Client' }
);

const Product = ProdutoModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
    },
    descricao: {
      type: DataTypes.STRING,
    },
    preco: {
      type: DataTypes.FLOAT,
    },
  },
  { sequelize, modelName: 'Produto' }
);

export { Client, Product };
