import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface ProdutoAttributes {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade?: number;
}

interface ProdutoCreationAttributes extends Optional<ProdutoAttributes, "id"> {}

class Produto extends Model<ProdutoAttributes, ProdutoCreationAttributes> {
  public id!: number;
  public nome!: string;
  public descricao!: string;
  public preco!: number;
  public quantidade?: number;

  static associate(models: any) {
    // Adicione associações conforme necessário
    Produto.hasMany(models.Compra, {
      foreignKey: 'produtoId',
      as: 'historicoCompras'
    });
  }
}

const initProdutoModel = (sequelize: Sequelize) => {
  Produto.init(
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
      quantidade: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Produto",
    }
  );
};

export { initProdutoModel };
export default Produto;
