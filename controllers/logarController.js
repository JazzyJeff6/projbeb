const LogarModel = require('../models/logarModel'); 

async function logarConta(req, res) {
    try {
       
        const {email, senha} = req.body; 

        console.log("Recebido do front:", email, senha);

        await LogarModel.logarUsuario({email, senha}); 

        res.json({ sucesso: true, mensagem: 'Login realizado' });
        
    } catch (error) {
    console.error("Erro no controller ao registrar:", error);

    if (error.message === "Usuário não encontrado, por favor verificar os dados novamente") {
        res.status(401).json({ sucesso: false, mensagem: error.message });
    } else if (error.message === "Email ou senha incorretos") {
        res.status(401).json({ sucesso: false, mensagem: 'Email ou senha incorretos' });
    }
}
}

module.exports = { logarConta };