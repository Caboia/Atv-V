// Importe os tipos necessários do Sequelize conforme sua implementação
import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import Produto from "./produto"; // Certifique-se de que o caminho está correto
import Cliente from "./cliente";

interface CompraAttributes {
  id: number;
  quantidade: number;
  totalGasto: number;
  produto: Produto; // Adicione a propriedade produto ao tipo Compra
}

interface CompraCreationAttributes extends Optional<CompraAttributes, "id"> {}

class Compra extends Model<CompraAttributes, CompraCreationAttributes> {
  public id!: number;
  public quantidade!: number;
  public totalGasto!: number;
  public produto!: Produto; // Adicione a propriedade produto à classe Compra

  static associate(models: any) {
    // Adicione associações conforme necessário
    Compra.belongsTo(models.Cliente, {
      foreignKey: 'clienteId',
      as: 'cliente'
    });

    Compra.belongsTo(models.Produto, {
      foreignKey: 'produtoId',
      as: 'produto'
    });
  }
}

const initCompraModel = (sequelize: Sequelize) => {
  Compra.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      quantidade: {
        type: DataTypes.INTEGER,
      },
      totalGasto: {
        type: DataTypes.FLOAT,
      },
      produto: {
        type: DataTypes.JSONB, // Defina o tipo adequado para Produto
        allowNull: false, // Ou ajuste conforme necessário
      },
    },
    {
      sequelize,
      modelName: "Compra",
    }
  );
};

export { initCompraModel };
export default Compra;
