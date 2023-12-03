import Produto from "../models/produto";
import Compra from "../models/compra";

const produtos: Produto[] = [];

function createProduto(produto: Produto): void {
  if (produtos.some((p) => p.nome === produto.nome)) {
    console.log("Erro: Produto com o mesmo nome já cadastrado.");
    return;
  }

  produto.id = produtos.length + 1;

  produtos.push(produto);
  console.log("Produto criado com sucesso.");
}

function listProdutos(): Produto[] {
  return produtos;
}

function findProdutoById(produtoId: number): Produto | null {
  const produto = produtos.find((p) => p.id === produtoId);
  return produto ? Produto.build(produto) : null;
}

async function updateProduto(produtoId: number, novosDetalhes: Produto): Promise<boolean> {
  const produto = await findProdutoById(produtoId);

  if (!produto) {
    console.log("Erro: Produto não encontrado.");
    return false;
  }

  await produto.update(novosDetalhes);

  console.log("Produto atualizado com sucesso.");
  return true;
}


function deleteProduto(produtoId: number): boolean {
  const index = produtos.findIndex((p) => p.id === produtoId);

  if (index === -1) {
    console.log("Erro: Produto não encontrado.");
    return false;
  }

  produtos.splice(index, 1);
  console.log("Produto excluído com sucesso.");
  return true;
}

export {
  createProduto,
  listProdutos,
  findProdutoById,
  updateProduto,
  deleteProduto,
  produtos,
};
