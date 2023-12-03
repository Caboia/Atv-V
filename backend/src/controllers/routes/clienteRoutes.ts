import express, { Request, Response, Router } from "express";
import * as clienteController from "../clienteController";

const router: Router = express.Router();

router.post("/clientes", (req: Request, res: Response) => {
  clienteController.criarCliente(req.body);
  res.status(201).send("Cliente criado com sucesso.");
});

router.get("/clientes", (req: Request, res: Response) => {
  clienteController.listarClientes();
  res.status(200).send("Lista de clientes retornada com sucesso.");
});

router.get("/clientes/genero/:genero", (req: Request, res: Response) => {
  clienteController.listarClientesGen({ genero: req.params.genero });
  res.status(200).send("Lista de clientes por gênero retornada com sucesso.");
});

router.get("/clientes/:id", (req: Request, res: Response) => {
  clienteController.buscarClientePorId({ id: parseInt(req.params.id) });
  res.status(200).send("Cliente retornado com sucesso.");
});

router.put("/clientes/:id", (req: Request, res: Response) => {
  clienteController.atualizarCliente({
    id: parseInt(req.params.id),
    nome: req.body.nome,
    email: req.body.email,
    genero: req.body.genero,
  });
  res.status(200).send("Cliente atualizado com sucesso.");
});

router.delete("/clientes/:id", (req: Request, res: Response) => {
  clienteController.excluirCliente({ id: parseInt(req.params.id) });
  res.status(200).send("Cliente excluído com sucesso.");
});

export default router;
