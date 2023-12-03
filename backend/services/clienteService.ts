import Cliente from "../models/cliente";
import Compra from "../models/compra";
import { listProdutos, findProdutoById } from "./produtoService";

const clientes: Cliente[] = [];

function createCliente(cliente: Cliente): void {
  if (clientes.some((c) => c.email === cliente.email)) {
    console.log("Erro: E-mail já cadastrado.");
    return;
  }

  cliente.id = clientes.length + 1;
  cliente.historicoCompras = [];

  clientes.push(cliente);
  console.log("Cliente criado com sucesso.");
}

function listClientes(): Cliente[] {
  return clientes;
}

function findClienteById(clienteId: number): Cliente | null {
  const cliente = clientes.find((c) => c.id === clienteId);
  return cliente ? Cliente.build(cliente) : null;
}


async function updateCliente(clienteId: number, novosDetalhes: Cliente): Promise<boolean> {
  const cliente = await findClienteById(clienteId);

  if (!cliente) {
    console.log("Erro: Cliente não encontrado.");
    return false;
  }

  await cliente.update(novosDetalhes);

  console.log("Cliente atualizado com sucesso.");
  return true;
}


function deleteCliente(clienteId: number): boolean {
  const index = clientes.findIndex((c) => c.id === clienteId);

  if (index === -1) {
    console.log("Erro: Cliente não encontrado.");
    return false;
  }

  clientes.splice(index, 1);
  console.log("Cliente excluído com sucesso.");
  return true;
}

function getTotalConsumidoPorGenero(produtoId: number, genero: string): number {
  let totalConsumido = 0;

  clientes.forEach((cliente) => {
    cliente.historicoCompras?.forEach((compra) => {
      if (compra.produto?.id === produtoId && cliente.genero === genero) {
        totalConsumido += compra.totalGasto;
      }
    });
  });

  return totalConsumido;
}

function consumirProduto(
  clienteId: number,
  produtoId: number,
  quantidade: number,
  totalGasto: number
): boolean {
  const cliente = findClienteById(clienteId);
  const produto = findProdutoById(produtoId);

  if (!cliente || !produto) {
    return false;
  }

  if (quantidade > (produto.quantidade != null ? produto.quantidade : 0) || quantidade < 0) {
    console.log("Erro: Quantidade inválida do produto disponível.");
    return false;
  }

  if (produto.quantidade != null) {
    produto.quantidade -= quantidade;
  }

  const compra = Compra.build({
    produto: produto!,
    quantidade: quantidade,
    totalGasto: totalGasto,
  });

  if (cliente.historicoCompras != null) {
    cliente.historicoCompras.push(compra);
  }

  console.log("Produto consumido com sucesso.");
  return true;
}

export {
  createCliente,
  listClientes,
  getTotalConsumidoPorGenero,
  findClienteById,
  updateCliente,
  deleteCliente,
  consumirProduto,
};
