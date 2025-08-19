const loginSql = require('../sql.env')
const bcrypt = require('bcrypt');


async function logarUsuario(usuario) {
    const data_login = new Date();
    const { email, senha } = usuario;
    let conn; // Variável para guardar a conexão
    console.log(email, senha, data_login)
    try {
     
        conn = await loginSql.getConnection();
        const selectlogin = `select * from drinkhub.users where email = ?`;
        const [loginemail] = await conn.execute(selectlogin, [email]);
        console.log(loginemail);
        if (loginemail.length === 0) {
            console.error("Usuário não encontrado");
            conn.release();
            throw new Error("Usuário não encontrado, por favor verificar os dados novamente");
        } else {
            const usuarioEncontrado = loginemail[0];
            console.log(usuarioEncontrado);
            const senhaCorreta = await bcrypt.compare(senha, usuarioEncontrado.senha);

             if (senhaCorreta) {
                const idLogin = usuarioEncontrado.id;
                const alterarData = `UPDATE drinkhub.users SET data_login = ? WHERE id = ?;`;
                const [updateData] = await conn.execute(alterarData, [data_login, idLogin]);
                //bateu os dados corretos
                   return true; 
             } else {
                throw new Error("Email ou senha incorretos");
             }

        }

    } catch (error) {
      
        console.error("Erro no model ao logar:", error);
        throw error;
    } finally {
     
        if (conn) {
            conn.release();
        }
    }
}


// 7. Exporta as funções que o controller poderá usar
module.exports = {
    logarUsuario
};