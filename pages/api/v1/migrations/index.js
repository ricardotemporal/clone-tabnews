import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import migrator from "models/migrator.js";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorsHandlers);

async function getHandler(request, response) {
  const pendingMigrations = await migrator.listPedingMigrations();
  return response.status(200).json(pendingMigrations);
}

async function postHandler(request, response) {
  const migratedMigrations = await migrator.runPedingMigrations();
  const statusCode = migratedMigrations.length > 0 ? 201 : 200;
  return response.status(statusCode).json(migratedMigrations);
}
