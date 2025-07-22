require('dotenv').config();

const { GoogleGenerativeAI } = require('@google/generative-ai');

const API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);


const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
  safetySettings: [
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE", // Bloqueia assédio médio ou superior
    },
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "BLOCK_MEDIUM_AND_ABOVE", // Bloqueia discurso de ódio
    },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
  ],
});


async function buscarDrink(req, res) {

    
function verificarPalavras(query) {
    //verifica as palavras que o usuário digitou, passa a verificaçao se pelo menos uma estiver na funçao
  const keywords = [
    //frutas
    'Abacate', 'Abacaxi', 'Abiu', 'Abricó', 'Abrunho', 'Açaí', 'Acerola', 'Akee', 'Alfarroba', 'Ameixa', 'Amêndoa', 'Amora', 'Ananás', 'Anona', 'Araçá', 'Arando', 'Araticum', 'Ata', 'Atemoia', 'Avelã', 'Babaco', 'Babaçu', 'Bacaba', 'Bacuri', 'Bacupari', 'Banana', 'Baru', 'Bergamota', 'Biribá', 'Buriti', 'Butiá', 'Cabeludinha', 'Cacau', 'Cagaita', 'Caimito', 'Cajá', 'Caju', 'Calabaça', 'Calabura', 'Calamondin', 'Cambucá', 'Cambuci', 'Camu-camu', 'Caqui', 'Carambola', 'Carnaúba', 'Castanha', 'Castanha-do-pará', 'Cereja', 'Ciriguela', 'Ciruela', 'Coco', 'Cranberry', 'Cupuaçu', 'Damasco', 'Dekopon', 'Dendê', 'Dióspiro', 'Dovyalis', 'Durião', 'Embaúba', 'Embaubarana', 'Engkala', 'Escropari', 'Esfregadinha', 'Esporão-de-galo', 'Figo', 'Framboesa', 'Fruta-do-conde', 'Fruta-pão', 'Feijoa', 'Figo-da-índia', 'Fruta-de-cedro', 'Fruta-de-lobo', 'Fruta-do-milagre', 'Fruta-de-tatu', 'Gabiroba', 'Glicosmis', 'Goiaba', 'Granadilla', 'Gravatá', 'Graviola', 'Groselha', 'Grumixama', 'Guabiju', 'Guabiroba', 'Guaraná', 'Hawthorn', 'Heisteria', 'Hilocéreo', 'Ibacurupari', 'Ilama', 'Imbe', 'Imbu', 'Inajá', 'Ingá', 'Inharé', 'Jabuticaba', 'Jaca', 'Jambo', 'Jambolão', 'Jamelão', 'Jaracatiá', 'Jatobá', 'Jenipapo', 'Jerivá', 'Juá', 'Jujuba', 'Kiwi', 'Kumquat', 'Kinkan', 'Kino', 'Kiwano', 'Kabosu', 'Karité', 'Korlan', 'Laranja', 'Limão', 'Lima', 'Lichia', 'Longan', 'Lucuma', 'Lacucha', 'Lulo', 'Lobeira', 'Langsat', 'Laranja-de-pacu', 'Mabolo', 'Maçã', 'Macadâmia', 'Macaúba', 'Mamão', 'Mamey', 'Mamoncillo', 'Maná-cubiu', 'Manga', 'Mangaba', 'Mangostão', 'Maracujá', 'Marang', 'Marmelo', 'Marolo', 'Marula', 'Massala', 'Melancia', 'Melão', 'Meloa', 'Mexerica', 'Mirtilo', 'Morango', 'Murici', 'Naranjilla', 'Nectarina', 'Nêspera', 'Noni', 'Noz', 'Noz-pecã', 'Noz-macadâmia', 'Oiti', 'Oxicoco', 'Orangelo', 'Pera', 'Pêssego', 'Pitanga', 'Pinha', 'Pitaia', 'Pitomba', 'Pitangatuba', 'Pindaíba', 'Pequi', 'Pequiá', 'Physalis', 'Pulasan', 'Pomelo', 'Pupunha', 'Puçá', 'Patauá', 'Pajurá', 'Pixirica', 'Pistache', 'Quina', 'Quiuí', 'Quixabeira', 'Romã', 'Rambai', 'Rambutão', 'Rukam', 'Saguaraji', 'Salak', 'Santol', 'Sapota', 'Sapoti', 'Sapucaia', 'Saputá', 'Seriguela', 'Sorvinha', 'Tangerina', 'Tamarindo', 'Tâmara', 'Toranja', 'Tucumã', 'Taiuva', 'Tapiá', 'Tarumã', 'Tangor', 'Tucujá', 'Uva', 'Umbu', 'Uvaia', 'Uchuva', 'Umê', 'Uxi', 'Ucuuba', 'Vacínio', 'Veludo', 'Vergamota', 'Veludo-branco', 'Wampi', 'Xixá', 'Yamamomo', 'Yuzu', 'Zimbro',
    // Palavras de ação
    'receita', 'fazer', 'como', 'ingrediente', 'drink', 'bebida', 'coquetel', 'cocktail', 'ensina',
    // Nomes de bebidas comuns
    'Vodka', 'Cachaça', 'Rum', 'Gin', 'Tequila', 'Whisky', 'Brandy', 'Saquê', 'Vinho tinto', 'Vinho branco', 'Espumante', 'Licor de café', 'café', 'Licor de laranja', 'Vermute', 'Aperol', 'Campari', 'Bitter Angostura', 'Cerveja', 'Pinga', 'cachaça',
    // Ingredientes comuns
    'Água com gás', 'Água tônica', 'água', 'Sucos', 'Suco', 'Suco de limão', 'Suco de abacaxi', 'Suco de cranberry', 'Refrigerante de cola', 'Refrigerante de limão', 'Refrigerante de guaraná', 'Xarope de açúcar', 'Gelo', 'Leite', 'Café', 'Chá gelado', 'Água de coco', 'Hortelã', 'Rodelas de limão', 'Rodelas de laranja', 'Cereja para drink', 'Azeitona', 'Sal', 'Açúcar', 'Pimenta do reino'
  ];

  // Converte a busca do usuário para minúsculas para a verificação não diferenciar maiúsculas/minúsculas
  const lowerCaseQuery = query.toLowerCase();

  // Retorna true se pelo menos uma palavra-chave for encontrada na busca
  return keywords.some(keyword => lowerCaseQuery.includes(keyword));
}

const { pesquisa } = req.body; 


if (!pesquisa || !verificarPalavras(pesquisa)) {
  //retorna erro se estiver fora das palavras chaves
  return res.status(400).json({
    error: "Por favor, escreva o nome da bebida que deseja ou os ingredientes que tenha em casa."
  });
}

  console.log("Recebido: ", pesquisa);

const prompt = `
  Você é um assistente especialista em coquetelaria e bebidas. Sua única função é fornecer receitas e sugestões de drinks, o usuário vai mandar os ingredientes que tem ou o nome da bebida para pegar a receita.
  Se o usuário perguntar sobre qualquer outro assunto que não seja relacionado a bebidas (como história, matemática, programação, etc.), recuse educadamente a resposta e diga que você só pode falar sobre drinks.

  Pergunta do usuário: "${pesquisa}"
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const retorno = response.text();
  console.log("retorno:", retorno);
    res.send(`Você buscou por: "${pesquisa}"\n\n
        Resposta da IA:
        \n${retorno}`);

  } catch (error) {
    console.error("Erro ao chamar a API do Gemini:", error);
    res.status(500).send("Ocorreu um erro ao processar sua solicitação com a IA.");
  }
}

module.exports = {
  buscarDrink
};