import express from "express";
import sequelize from "./src/controllers/db/db"; 
import clienteRoutes from "./src/controllers/routes/clienteRoutes";
import produtoRoutes from "./src/controllers/routes/produtoRoutes";

async function startApp() {
  try {
    await sequelize.sync();
    const app = express();
    const port = process.env.PORT || 3000;

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/api/clientes", clienteRoutes);
    app.use("/api/produtos", produtoRoutes);

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });

    console.log("Aplicativo iniciado com sucesso!");
  } catch (error) {
    console.error("Erro ao iniciar o aplicativo:", error);
  }
}

startApp();
