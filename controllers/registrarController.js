const UserModel = require('../models/registrarModel'); 

async function registrarLogin(req, res) {
    try {
        // 2. PEGAR OS DADOS DO BODY:
        // Certifique-se de que seu formulário no front-end está enviando um campo 'nome'.
        const { nome, email, senha, dataNascimento } = req.body; // <-- MUDANÇA

        console.log("Recebido do front:", nome, email, senha, dataNascimento);

        // 3. CHAMAR O MODEL:
        // Aqui está a mágica! Chamamos a função 'criarUsuario' do nosso model
        // e passamos um objeto com os dados necessários.
        await UserModel.criarUsuario({ nome, email, senha, dataNascimento }); // <-- MUDANÇA

        res.json({ sucesso: true, mensagem: 'Usuário cadastrado com sucesso!' });
        
    } catch (error) {
    console.error("Erro no controller ao registrar:", error);

    // Verifica se a mensagem de erro é a que você lançou na model
    if (error.message === "Email já cadastrado.") {
        // Se for, retorna um status 409 (Conflict) e a mensagem específica
        res.status(409).json({ sucesso: false, mensagem: error.message });
    } else {
        // Para qualquer outro erro, retorna o status 500
        res.status(500).json({ sucesso: false, mensagem: 'Erro interno ao cadastrar usuário.' });
    }
}
}

module.exports = { registrarLogin };