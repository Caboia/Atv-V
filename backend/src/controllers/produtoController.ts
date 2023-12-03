import Produto from "../../models/produto";
import * as produtoService from "../../services/produtoService";

async function criarProduto(args: {
  nome: string;
  descricao: string;
  preco: number;
}): Promise<void> {
  try {
    const { nome, descricao, preco } = args;

    await Produto.create({ nome, descricao, preco });

    console.log("Produto criado com sucesso.");
  } catch (error) {
    console.error("Erro ao criar produto:", error);
  }
}

async function listarProdutos(): Promise<void> {
  try {
    const produtos = await produtoService.listProdutos();

    if (produtos.length === 0) {
      console.log("Nenhum produto encontrado.");
    } else {
      produtos.forEach((produto) => {
        console.log(
          `ID: ${produto.id}, Nome: ${produto.nome}, Descrição: ${produto.descricao}, Preço: ${produto.preco}`
        );
      });
    }
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
  }
}

function buscarProdutoPorId(args: { id: number }): void {
  const { id } = args;
  const produto = produtoService.findProdutoById(id);
  if (produto) {
    console.log(
      `Produto encontrado - ID: ${produto.id}, Nome: ${produto.nome}, Descrição: ${produto.descricao}, Preço: ${produto.preco}`
    );
  } else {
    console.log("Produto não encontrado.");
  }
}

async function atualizarProduto(args: {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
}): Promise<void> {
  try {
    const { id, nome, descricao, preco } = args;

    const produtoExistente = await Produto.findByPk(id);

    if (produtoExistente) {
      await produtoExistente.update({ nome, descricao, preco });

      console.log("Produto atualizado com sucesso.");
    } else {
      console.log("Produto não encontrado. Atualização não realizada.");
    }
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
  }
}

function excluirProduto(args: { id: number }): void {
  const { id } = args;
  const exclusaoComSucesso = produtoService.deleteProduto(id);
  if (exclusaoComSucesso) {
    console.log("Produto excluído com sucesso.");
  } else {
    console.log("Produto não encontrado. Exclusão não realizada.");
  }
}

export {
  criarProduto,
  listarProdutos,
  buscarProdutoPorId,
  atualizarProduto,
  excluirProduto,
};
