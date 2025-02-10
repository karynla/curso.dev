import database from "infra/database";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;
  const databaseName = process.env.POSTGRES_DB;

  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;

/*
  const updateAt = new Date().toISOString();

  const version = await database.query("SHOW server_version;");
  const versionVL = version.rows[0].server_version;

  const infoMaxConnections = await database.query("SHOW max_connections;");
  const maxConnections = parseInt(infoMaxConnections.rows[0].max_connections);

  const databaseName = process.env.POSTGRES_DB;
  const infoUsedConnections = await database.query({
    text: "SELECT count(*) FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const usedConnections = parseInt(infoUsedConnections.rows[0].count);

  response.status(200).json({
    updated_at: updateAt,
    version_vL: versionVL,
    max_connections: maxConnections,
    opened_connections: usedConnections,
  });
}

export default status;
*/

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
