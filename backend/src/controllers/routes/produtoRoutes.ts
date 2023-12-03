import express, { Request, Response, Router } from "express";
import * as produtoController from "../produtoController";

const router: Router = express.Router();

router.post("/produtos", (req: Request, res: Response) => {
  produtoController.criarProduto(req.body);
  res.status(201).send("Produto criado com sucesso.");
});

router.get("/produtos", (req: Request, res: Response) => {
  produtoController.listarProdutos();
  res.status(200).send("Lista de produtos retornada com sucesso.");
});

router.get("/produtos/:id", (req: Request, res: Response) => {
  produtoController.buscarProdutoPorId({ id: parseInt(req.params.id) });
  res.status(200).send("Produto retornado com sucesso.");
});

router.put("/produtos/:id", (req: Request, res: Response) => {
  produtoController.atualizarProduto({
    id: parseInt(req.params.id),
    nome: req.body.nome,
    descricao: req.body.descricao,
    preco: req.body.preco,
  });
  res.status(200).send("Produto atualizado com sucesso.");
});

router.delete("/produtos/:id", (req: Request, res: Response) => {
  produtoController.excluirProduto({ id: parseInt(req.params.id) });
  res.status(200).send("Produto excluído com sucesso.");
});

export default router;
