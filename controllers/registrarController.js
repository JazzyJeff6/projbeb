const UserModel = require('../models/registrarModel'); 

async function registrarLogin(req, res) {
    try {
    
        const { nome, email, senha, dataNascimento } = req.body; 

        console.log("Recebido do front:", nome, email, senha, dataNascimento);

        
        await UserModel.criarUsuario({ nome, email, senha, dataNascimento }); 

        res.json({ sucesso: true, mensagem: 'Usuário cadastrado com sucesso!' });
        
    } catch (error) {
    console.error("Erro no controller ao registrar:", error);

    if (error.message === "Email já cadastrado.") {
 
        res.status(409).json({ sucesso: false, mensagem: error.message });
    } else {

        res.status(500).json({ sucesso: false, mensagem: 'Erro interno ao cadastrar usuário.' });
    }
}
}

module.exports = { registrarLogin };