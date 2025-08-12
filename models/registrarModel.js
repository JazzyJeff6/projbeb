const loginSql = require('../sql.env')
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function criarUsuario(usuario) {
    const data_criacao = new Date();
    const data_modificacao = new Date();
    const { nome, email, senha, dataNascimento } = usuario;
    const hash = await bcrypt.hash(senha, saltRounds);
    let conn; // Variável para guardar a conexão
    console.log(nome, email, senha, data_criacao, data_modificacao, dataNascimento)
    try {
        // 2. Pega uma conexão do pool
        conn = await loginSql.getConnection();
        const selectlogin = `select * from drinkhub.users where email = email`;
        const [loginemail] = await conn.execute(selectlogin, [email]);
        if (loginemail.length >0) {
            console.error("Email já cadastrado, por favor realize o login ou coloque outro email");
            conn.release();
            throw new Error("Email já cadastrado.");
        } else {

            // 3. Define a query SQL com placeholders (?) para segurança (evita SQL Injection)
            const sql = 'INSERT INTO drinkhub.users (nome, senha, email, data_criacao, data_modificacao, data_nasc) VALUES (?, ?, ?, ?, ?, ?)';

            // 4. Executa a query, passando os valores em um array
            const [result] = await conn.execute(sql, [nome, hash, email, data_criacao, data_modificacao, dataNascimento]);

            // 5. Retorna o resultado da inserção (útil para saber o ID do novo usuário, etc.)
            return result;
        }

    } catch (error) {
        // Se der erro, loga o erro e o joga para frente para o controller tratar
        console.error("Erro no model ao criar usuário:", error);
        throw error;
    } finally {
        // 6. MUITO IMPORTANTE: Libera a conexão de volta para o pool, ocorrendo erro ou não
        if (conn) {
            conn.release();
        }
    }
}


// 7. Exporta as funções que o controller poderá usar
module.exports = {
    criarUsuario
};