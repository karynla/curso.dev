test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  // data padrao ISO8601
  expect(responseBody.updated_at).toBeDefined();

  // maximo de conexoes que o banco teve
  expect(responseBody.max_connections).toBeDefined();
  expect(responseBody.max_connections).toBeGreaterThan(0);

  // conexoes usadas atualmente
  expect(responseBody.used_connections).toBeDefined();
  expect(responseBody.used_connections).toBeGreaterThanOrEqual(1);
  expect(responseBody.used_connections).toBeLessThanOrEqual(
    //used menor ou igual ao max connections
    responseBody.max_connections,
  );
});

/*



test("GET to /api/v1/status should return 200", async () => {}
define um teste com o nome "pegue a api/v1/status e retorne 200", com uma funcao assincrona

const response = await fetch("http://localhost:3000/api/v1/status");
coloca em uma variavel constante a response, que faz uma requisicao await (espera) usando o metodo .fetch(), ele usa o await pois este metodo retorna uma promise, que demora muito pra chegar

expect(response.status).toBe(200);
esperado que a o status da response, que é a requisicao feita ao servidor seja 200

response é um parâmetro que representa a resposta HTTP.

Ele contém métodos que permitem configurar o código de status, corpo e outros aspectos da resposta enviada ao cliente.

*/
