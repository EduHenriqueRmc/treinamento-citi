import express from "express";
import {  readAllUsers } from "./controllers/UserController";
import { createCalcado, deleteCalcados, readCalcados, updateCalcados, getById} from "./controllers/CalcadoController";
import { readCalcadosByTamanho, readCalcadosByMarca, readTotalEstoque} from "./repositorie/CalcadoRepositorie";

const routes = express.Router();
routes.get("/users", readAllUsers);

//MÉTODOS HTTP E SUAS RESPECTIVAS FUNÇÕES
routes.post("/calcados", createCalcado);
routes.get("/calcados", readCalcados);
routes.patch("/calcados/:id", updateCalcados); //ATUALIZA PELO ID
routes.delete("/calcados/:id", deleteCalcados);//DELETA PELO ID 
routes.get("/calcados/:id", getById) //BUSCA PELO ID

//EXTRAS
routes.get("/calcados/tamanho/:valor", readCalcadosByTamanho);
routes.get("/calcados/marca/:marca", readCalcadosByMarca);
routes.get("/calcados/estoque/total", readTotalEstoque);

export default routes;