import express, { Request, Response } from "express";
import * as clienteController from "../clienteController";

const app = express();

// Rota para criar um cliente
app.post("/api/clientes", (req: Request, res: Response) => {
  clienteController.criarCliente(req.body);
  res.status(201).send("Cliente criado com sucesso.");
});

// Rota para listar clientes
app.get("/api/clientes", (req: Request, res: Response) => {
  clienteController.listarClientes();
  res.status(200).send("Lista de clientes retornada com sucesso.");
});

// Rota para listar clientes por gênero
app.get("/api/clientes/genero/:genero", (req: Request, res: Response) => {
  clienteController.listarClientesGen({ genero: req.params.genero });
  res.status(200).send("Lista de clientes por gênero retornada com sucesso.");
});

// Rota para buscar um cliente por ID
app.get("/api/clientes/:id", (req: Request, res: Response) => {
  clienteController.buscarClientePorId({ id: parseInt(req.params.id) });
  res.status(200).send("Cliente retornado com sucesso.");
});

// Rota para atualizar um cliente
app.put("/api/clientes/:id", (req: Request, res: Response) => {
  clienteController.atualizarCliente({
    id: parseInt(req.params.id),
    nome: req.body.nome,
    email: req.body.email,
    genero: req.body.genero,
  });
  res.status(200).send("Cliente atualizado com sucesso.");
});

// Rota para excluir um cliente
app.delete("/api/clientes/:id", (req: Request, res: Response) => {
  clienteController.excluirCliente({ id: parseInt(req.params.id) });
  res.status(200).send("Cliente excluído com sucesso.");
});

// Adicione outras rotas conforme necessário para as demais funções do seu controller

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
