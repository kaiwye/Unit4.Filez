import { faker } from "@faker-js/faker";

import db from "#db/client";
import { createFolder } from "#db/queries/folders";
import { createFile } from "#db/queries/files";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  for (let i = 0; i < 3; i++) {
    const folder = {
      name: faker.commerce.department(),
    };
    const createdFolder = await createFolder(folder);

    for (let j = 0; j < 5; j++) {
      const file = {
        name: faker.system.fileName(),
        size: faker.number.int({ min: 100, max: 5000 }),
        folderId: createdFolder.id,
      };
      await createFile(file);
    }
  }
}
