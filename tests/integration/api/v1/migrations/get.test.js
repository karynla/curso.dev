test("GET to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);

  // espera que o responseBody sera um Array
  // seja true (se for true o teste passa), toBe() só aceita true ou false
  expect(Array.isArray(responseBody)).toBe(true);
});
