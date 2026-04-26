import { Request, Response } from "express";
import prisma from "@database";

//FUNÇÃO CREATE - REGISTRA O PRODUTO
export const createCalcado = async (req: Request, res: Response) => {

    try{

        //DECLARA AS VARIAVES DO PRODUTO NO BODY 
        const {nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque} = req.body;

        //VERIFICA SE TODAS AS INFORMAÇÕES FORAM PREENCHIDAS - RETORNA ERRO 404
        if (!nome_produto || !cor || !marca || !tamanho || !preco || !quantidade_em_estoque){
            return res.status(404).json({
                message: "Preencha todas as informações obrigatórias!"
            });
        }

        //CRIA O PRODUTO E RESGISTRA SEUS DADOS
        const calcado = await prisma.calcado.create({
            data: {
                nome_produto,
                cor,
                marca,
                tamanho,
                preco,
                quantidade_em_estoque
            }

        })
        
        //PRODUTO REGISTRADO - RETORNA STATUS 201
        return res.status(201).json({
            message: "Calçado cadastrado com sucesso!"
        })

    //DETECTA ERROS NO BLOCO TRY
    } catch(error){

        //RETORNA ERRO 400
        return res.status(400).json({
            message: "Erro ao cadastrar calçado",
            error,
        })

    }

}

//FUNÇÃO READ - EXIBE OS PRODUTOS REGISTRADOS
export const readCalcados = async (req: Request, res: Response) => {
    try {

        //
        const calcados = await prisma.calcado.findMany();

        //USANDO (!CALCADOS) O BLOCO NUNCA ERA EXECUTADO, POIS O ARRAY VAZIO [] TEM VALOR VERDADEIRO
        //SE O ARRAY ESTIVER VAZIO, EXECUTA O BLOCO
        if (calcados.length === 0){

            //RETORNA ERRO 404
            return res.status(404).json({
                message: "Nenhum calçado cadastrado ainda"
            })
        }

        //RETORNA OS CALCADOS E STATUS 200 DE SUCESSO
        return res.status(200).json(calcados)

    } catch (error){
        return res.status(400).json({
            message: "Erro ao buscar calçados",
            error,
        })
    }
}

//FUNÇÃO UPDATE - ATUALIZA UM PRODUTO
export const updateCalcados = async (req: Request, res: Response) => {
    try{

        //DECLARA VARIAVEIS
        const id = Number(req.params.id); //TRANSFORMA ID EM NÚMERO
        const {nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque} = req.body;

        //ATUALIZA OS DADOS DO PRODUTO PELO ID 
        const calcado = await prisma.calcado.update({
            data: {
                nome_produto,
                cor,
                marca,
                tamanho,
                preco,
                quantidade_em_estoque
            },
            where:{
                id: id,
            }
        })

        return res.status(200).json();

    } catch(error){
        return res.status(400).json({
            message: "Erro ao atualizar cadastro de calçado",
            error,
        })
    }
}

//FUNÇÃO DELETE - EXCLUI UM PRODUTO
export const deleteCalcados = async (req: Request, res: Response) => {
    try{

        const id = Number(req.params.id);

        //VERIFICA SE O ID EXISTE
        if (!id){

            //SE NN EXISTE, RETORNA ERRO 404
            return res.status(404).json({
                message: "Calçado não encontrado"
            })
        }

        //EXCLUI OS DADOS DO PRODUTO PELO ID 
        const calcado = await prisma.calcado.delete({
            where: {
                id: id,
            }
        })

        return res.status(200).json({
            message: "Calçado deletado com sucesso!"
        })

    } catch(error){

        return res.status(400).json({
            message: "Erro ao deletar calçado",
            error,
        })

    }
}

//FUNÇÃO DE LEITURA POR ID 
export const getById = async (req: Request, res: Response) => {

    try{
        const id = Number(req.params.id);
        
        //FUNÇÃO findUnique PARA BUSCAR APENAS UM REGISTRO 
        const calcado = await prisma.calcado.findUnique({
            where: {
                id: id
            }
        })

        //SE NENHUM CALCADO CORRESPONDE AO ID, RETORNA NULO
        if (!calcado){
            return res.status(404).json({
                message: "Nenhum calçado corresponde ao id inserido"
            })
        }

        //RETORNA O PRODUTO 
        return res.status(200).json(calcado)

    } catch (error) {
        return res.status(400).json({
            message: "Erro na busca",
            error,
        })
    }

}


