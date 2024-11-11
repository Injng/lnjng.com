import type { Note } from "$lib/types";

async function getNotes(subjectSlug, categorySlug) {
  let notes: Note[] = [];

  const allPaths = import.meta.glob('/src/notes/**/**/*.svx', { eager: true });
  const paths = Object.entries(allPaths).filter(([path]) =>
    path.includes(`/notes/${subjectSlug}/${categorySlug}/`));

  for (const path of paths) {
    const file = path[0];
    const title = path[1].metadata.title;
    const slug = file.split('/').at(-1)?.replace('.svx', '');

    if (file && slug) {
      const note: Note = { title, slug, category: categorySlug, subject: subjectSlug };
      notes.push(note);
    }
  }
  
  return notes;
}

export async function load({ params }) {
  let notes = await getNotes(params.subject, params.category);
  return { notes, subject: params.subject, category: params.category };
}
