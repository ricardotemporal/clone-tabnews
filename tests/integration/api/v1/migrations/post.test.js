import database from "infra/database";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
});

describe("POST /api/v1/migrations", () => {
  describe("Usuário anônimo", () => {
    describe("Roda as migrações pendentes", () => {
      test("Pela primeira vez", async () => {
        const responseBefore = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );
        expect(responseBefore.status).toBe(201);

        const responseBeforeBody = await responseBefore.json();
        expect(Array.isArray(responseBeforeBody)).toBe(true);
        expect(responseBeforeBody.length).toBeGreaterThan(0);
      });
      test("Pela segunda vez", async () => {
        const responseAfter = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );
        expect(responseAfter.status).toBe(200);

        const responseAfterBody = await responseAfter.json();
        expect(Array.isArray(responseAfterBody)).toBe(true);
        expect(responseAfterBody.length).toBe(0);
      });
    });
  });
});
