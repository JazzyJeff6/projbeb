const loginSql = require('../sql.env')
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function criarUsuario(usuario) {
    const data_criacao = new Date();
    const data_modificacao = new Date();
    const { nome, email, senha, dataNascimento } = usuario;
    const hash = await bcrypt.hash(senha, saltRounds);
    let conn; 
    console.log(nome, email, senha, data_criacao, data_modificacao, dataNascimento)
    try {

        conn = await loginSql.getConnection();
        const selectlogin = `select * from drinkhub.users where email = ?`;
        const [loginemail] = await conn.execute(selectlogin, [email]);
        if (loginemail.length >0) {
            console.error("Email já cadastrado, por favor realize o login ou coloque outro email");
            conn.release();
            throw new Error("Email já cadastrado.");
        } else {

            const sql = 'INSERT INTO drinkhub.users (nome, senha, email, data_criacao, data_modificacao, data_nasc) VALUES (?, ?, ?, ?, ?, ?)';

            const [result] = await conn.execute(sql, [nome, hash, email, data_criacao, data_modificacao, dataNascimento]);

            return result;
        }

    } catch (error) {

        console.error("Erro no model ao criar usuário:", error);
        throw error;
    } finally {

        if (conn) {
            conn.release();
        }
    }
}



module.exports = {
    criarUsuario
};