import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import Produto from "./produto";
import Compra from "./compra";

interface ClienteAttributes {
  id: number;
  nome: string;
  email: string;
  genero: string;
}

interface ClienteCreationAttributes extends Optional<ClienteAttributes, "id"> {
  historicoCompras?: Compra[];
}

class Cliente
  extends Model<ClienteAttributes, ClienteCreationAttributes>
  implements ClienteAttributes {
  public id!: number;
  public nome!: string;
  public email!: string;
  public genero!: string;
  public historicoCompras?: Compra[];

  static associate(models: any) {
    // Adicione associações conforme necessário
    Cliente.hasMany(models.Compra, {
      foreignKey: 'clienteId',
      as: 'historicoCompras'
    });
  }
}

const initClienteModel = (sequelize: Sequelize) => {
  Cliente.init(
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
    {
      sequelize,
      modelName: "Cliente",
      timestamps: true,
    }
  );

  return Cliente;
};

export { initClienteModel };
export default Cliente;
