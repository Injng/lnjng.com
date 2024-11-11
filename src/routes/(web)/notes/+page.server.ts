import type { Subject } from "$lib/types";

async function getSubjects() {
  let subjects: Subject[] = [];

  const paths = import.meta.glob('/src/notes/*.dir', { eager: true });

  for (const path in paths) {
    const file = paths[path];
    const slug = path.split('/').at(-1)?.replace('.dir', '');

    if (file && slug) {
      const subject: Subject = { title: slug, slug };
      subjects.push(subject);
    }
  }
  
  return subjects;
}

export async function load() {
  let subjects = await getSubjects();
  return { subjects };
}
