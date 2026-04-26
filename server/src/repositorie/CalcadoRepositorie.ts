import { Request, Response } from "express";
import prisma from "@database";

//FUNÇÃO PARA RETORNAR CALCADOS PELO TAMANHO
export const readCalcadosByTamanho = async (req: Request, res: Response) => {

    try{
        const { valor } = req.params; //RECEBE VALOR COMO PARAMETRO NA ROTA

        const calcados = await prisma.calcado.findMany({

            //FILTRA OS CALCADOS PELO TAMANHO INTEIRO
            where: {
                tamanho: Number(valor)
            }
        });

        //ARRAY VAZIO
        if (calcados.length === 0){
            return res.status(404).json({
                message: "Nenhum calçado se encaixa na busca"
            });
        }

        return res.status(200).json(calcados);

    } catch (error) {
        return res.status(400).json({
            message: "Erro na busca",
            error,
        })
    }
}

//FUNÇÃO PARA RETORNAR CALCADOS PELA MARCA
export const readCalcadosByMarca = async (req: Request, res: Response) => {

    try{
        const { marca } = req.params; //RECEBE A MARCA NA ROTA

        const calcados = await prisma.calcado.findMany({

            //FILTRA CALCADOS QUE CORRESPONDEM A MARCA NA ROTA
            where: {
                marca: marca 
            }
        });

        //ARRAY VAZIO
        if (calcados.length === 0){
            return res.status(404).json({
                message: "Nenhum calçado se encaixa na busca"
            });
        }

        return res.status(200).json(calcados);

    } catch (error) {
        return res.status(400).json({
            message: "Erro na busca",
            error,
        });
    }
}

//FUNÇÃO PARA RETORNAR O TOTAL EM ESTOQUE
export const readTotalEstoque = async (req: Request, res: Response) => {

    try{

        //FUNÇÃO AGGREGATE REALIZA OPERAÇÕES COM O PARAMETRO ESPECIFICADO
        const calcados = await prisma.calcado.aggregate({

            //_sum OPERA A SOMA DE quantidade_em_estoque
            _sum: {
                quantidade_em_estoque: true
            }
        });

        //SOMA NUNCA É 0, RETORNA null
        if (calcados._sum.quantidade_em_estoque === null){
            return res.status(404).json({
                message: "Nenhum calçado em estoque"
            });
        }

        //RETORNA O TOTAL
        return res.status(200).json({
            total: calcados._sum.quantidade_em_estoque
        });

    } catch (error) {
        return res.status(400).json({
            message: "Erro na busca",
            error,
        })
    }
}

