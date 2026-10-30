import { db } from './index.ts';
import { learningPaths, modules, lessons } from './schema.ts';

export async function seedCurriculum() {
  for (let l = 1; l <= 8; l++) {
    const [path] = await db.insert(learningPaths).values({
      title: `Level ${l}: AI Level ${l}`,
      description: `Description for Level ${l}`,
      level: l,
    }).returning();

    for (let m = 1; m <= 1; m++) {
      const [mod] = await db.insert(modules).values({
        pathId: path.id,
        title: `Module ${m}`,
        description: `Description for Module ${m}`,
        order: m,
      }).returning();

      for (let i = 1; i <= 5; i++) {
        await db.insert(lessons).values({
          moduleId: mod.id,
          title: `Lesson ${i}`,
          content: `Content for Lesson ${i} of Level ${l}`,
          type: 'theory',
          order: i,
        });
      }
    }
  }
}
