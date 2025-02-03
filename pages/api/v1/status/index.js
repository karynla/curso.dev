import database from "infra/database";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const version = await database.query("SHOW server_version");
  const versionVL = version.rows[0].server_version;

  const infoMaxConnections = await database.query("SHOW max_connections");
  const maxConnections = parseInt(infoMaxConnections.rows[0].max_connections);

  const infoUsedConnections = await database.query(
    "SELECT COUNT(*) FROM pg_stat_activity WHERE state = 'active';",
  );
  const usedConnections = parseInt(infoUsedConnections.rows[0].count);

  response.status(200).json({
    updated_at: updateAt,
    version_vL: versionVL,
    max_connections: maxConnections,
    used_connections: usedConnections,
  });
}

export default status;
/*
- requeste = vem de fora, entra no sistema/funcao
- response = trata do que quer ser respondido para fora
- renponse faz o endpoint responder com algo
- response é um objeto que tem um metodo chamado status(), que é usado para definir o status code da resposta
- statuscode é um numero que sinaliza se deu tudo certo com a requisiçao ou nao (200, tudo ok), parametro do metodo status()
- metodo send(), enviar, aceita por exemplo uma string para ser enviada, entre outras coisas
- metodo json() assume o charset=utf8 e o send() nao
- json() esse metodo espera que a response seja com um json { "chave" : "valor" };
// exporta por padrao a propriedade status
// o next sabe que o padrao/default responsavel por ess request e response é a funcao status
*/
