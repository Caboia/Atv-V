import Cliente from "../../models/cliente";
import * as clienteService from "../../services/clienteService";
import * as produtoService from "../../services/produtoService";

async function criarCliente(args: {
  nome: string;
  email: string;
  genero: string;
}): Promise<void> {
  try {
    const { nome, email, genero } = args;

    const novoCliente = Cliente.build({ nome, email, genero });

    await novoCliente.save();

    console.log("Cliente criado com sucesso.");
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
  }
}

async function listarClientes() {
  const clientes = await Cliente.findAll();
  if (clientes.length === 0) {
    console.log("Nenhum cliente encontrado.");
  } else {
    clientes.forEach((cliente) => {
      console.log(
        `ID: ${cliente.id}, Nome: ${cliente.nome}, Email: ${cliente.email}, Gênero: ${cliente.genero}`
      );
    });
  }
}

async function listarClientesGen(args: { genero: string }): Promise<void> {
  const { genero } = args;
  const clientes = await Cliente.findAll({
    where: {
      genero: genero,
    },
  });

  if (clientes.length === 0) {
    console.log(`Nenhum cliente encontrado com o gênero ${genero}.`);
  } else {
    clientes.forEach((cliente) => {
      console.log(
        `ID: ${cliente.id}, Nome: ${cliente.nome}, Email: ${cliente.email}, Gênero: ${cliente.genero}`
      );
    });
  }
}

async function buscarClientePorId(args: { id: number }): Promise<void> {
  const { id } = args;
  const cliente = await Cliente.findByPk(id);

  if (cliente) {
    console.log(
      `Cliente encontrado - ID: ${cliente.id}, Nome: ${cliente.nome}, Email: ${cliente.email}, Gênero: ${cliente.genero}`
    );
  } else {
    console.log("Cliente não encontrado.");
  }
}

async function atualizarCliente(args: {
  id: number;
  nome: string;
  email: string;
  genero: string;
}): Promise<void> {
  try {
    const { id, nome, email, genero } = args;

    const clienteExistente = await Cliente.findByPk(id);

    if (clienteExistente) {
      await clienteExistente.update({ nome, email, genero });

      console.log("Cliente atualizado com sucesso.");
    } else {
      console.log("Cliente não encontrado. Atualização não realizada.");
    }
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
  }
}

async function excluirCliente(args: { id: number }): Promise<void> {
  const { id } = args;
  const exclusaoComSucesso = await clienteService.deleteCliente(id);
  if (exclusaoComSucesso) {
    console.log("Cliente excluído com sucesso.");
  } else {
    console.log("Cliente não encontrado. Exclusão não realizada.");
  }
}

async function listarTopClientes(): Promise<string[]> {
  const clientes = await clienteService.listClientes();

  const clientesOrdenados = clientes.sort((a, b) => {
    const historicoA = a.historicoCompras || [];
    const historicoB = b.historicoCompras || [];
  
    return historicoB.length - historicoA.length;
  });
  

  const topClientesNomes = clientesOrdenados
  .slice(0, 10)
  .map((cliente) => {
    const historicoCompras = cliente.historicoCompras || [];
    const totalGasto = historicoCompras.reduce(
      (total, compra) => total + compra.totalGasto,
      0
    );

    return `${cliente.nome} (R$ ${totalGasto.toFixed(2)})`;
  });

  return topClientesNomes;
}

async function listarBottomClientes(): Promise<string[]> {
  const clientes = await clienteService.listClientes();

  const clientesOrdenados = clientes.sort((a, b) => {
    const historicoA = a.historicoCompras || [];
    const historicoB = b.historicoCompras || [];

    return historicoA.length - historicoB.length;
  });

  const bottomClientesNomes = clientesOrdenados
    .slice(0, 10)
    .map((cliente) => cliente.nome);

  return bottomClientesNomes;
}

async function consumirProduto(
  clienteId: number,
  produtoId: number,
  quantidade: number,
  precoUnitario: number
): Promise<boolean> {
  const cliente = await clienteService.findClienteById(clienteId);
  const produto = await produtoService.findProdutoById(produtoId);

  if (!cliente || !produto) {
    console.log("Erro: Cliente ou produto não encontrado.");
    return false;
  }

  const totalGasto = quantidade * precoUnitario;

  const sucessoConsumo = await clienteService.consumirProduto(
    clienteId,
    produtoId,
    quantidade,
    totalGasto
  );

  if (sucessoConsumo) {
    console.log(
      `Produto '${produto.nome}' consumido por ${
        cliente.nome
      }. Total gasto: R$ ${totalGasto.toFixed(2)}.`
    );
  } else {
    console.log("Erro ao consumir o produto.");
  }

  return sucessoConsumo;
}

async function listarTopClientesGasto(): Promise<string[]> {
  const clientes = await clienteService.listClientes();

  const clientesOrdenados = clientes.sort((a, b) => {
    const totalGastoA = a.historicoCompras?.reduce(
      (total, compra) => total + compra.totalGasto,
      0
    ) || 0;

    const totalGastoB = b.historicoCompras?.reduce(
      (total, compra) => total + compra.totalGasto,
      0
    ) || 0;

    return totalGastoB - totalGastoA;
  });

  const topClientesNomes = clientesOrdenados
    .slice(0, 10)
    .map(
      (cliente) =>
        `${cliente.nome} (R$ ${cliente.historicoCompras
          ?.reduce((total, compra) => total + compra.totalGasto, 0)
          .toFixed(2)})`
    );

  return topClientesNomes;
}

async function listarProdutosMaisConsumidos(): Promise<void> {
  const clientes = await clienteService.listClientes();

  const todasCompras = clientes.flatMap((cliente) => cliente.historicoCompras);

  const produtosConsumidos = new Map<number, number>();

  todasCompras.forEach((compra) => {
    if (compra && compra.produto) {
      const quantidadeConsumida = produtosConsumidos.get(compra.produto.id) || 0;
      produtosConsumidos.set(
        compra.produto.id,
        quantidadeConsumida + compra.quantidade
      );
    }
  });

  const produtosOrdenados = Array.from(produtosConsumidos.entries()).sort(
    ([, quantidadeA], [, quantidadeB]) => quantidadeB - quantidadeA
  );

  console.log("Produtos mais consumidos:");
  produtosOrdenados.forEach(([produtoId, quantidade]) => {
    const produto = produtoService.findProdutoById(produtoId);
    if (produto) {
      console.log(
        `Produto: ${produto.nome}, Quantidade Consumida: ${quantidade}`
      );
    }
  });
}

async function listarProdutosMaisConsumidosPorGenero(args: { genero: string }): Promise<void> {
  const { genero } = args;
  const produtos = await produtoService.listProdutos();

  const produtosFiltrados = await Promise.all(
    produtos.map(async (produto) => {
      const totalConsumidoPorGenero = await clienteService.getTotalConsumidoPorGenero(
        produto.id,
        genero
      );
      return { produto, totalConsumidoPorGenero };
    })
  );

  const produtosConsumidos = produtosFiltrados.filter(
    (item) => item.totalConsumidoPorGenero > 0
  );

  if (produtosConsumidos.length === 0) {
    console.log(`Nenhum produto consumido encontrado para o gênero ${genero}.`);
  } else {
    produtosConsumidos.forEach((item) => {
      console.log(
        `ID: ${item.produto.id}, Nome: ${item.produto.nome}, Descrição: ${
          item.produto.descricao
        }, Preço: R$ ${item.produto.preco.toFixed(2)}, Total consumido por ${genero}: R$ ${item.totalConsumidoPorGenero.toFixed(2)}`
      );
    });
  }
}


export {
  criarCliente,
  listarProdutosMaisConsumidos,
  consumirProduto,
  listarClientes,
  buscarClientePorId,
  listarTopClientes,
  listarProdutosMaisConsumidosPorGenero,
  listarTopClientesGasto,
  listarBottomClientes,
  listarClientesGen,
  atualizarCliente,
  excluirCliente,
};
