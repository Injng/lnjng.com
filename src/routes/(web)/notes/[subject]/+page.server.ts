import type { Category } from "$lib/types";

async function getCategories(subjectSlug) {
  let categories: Category[] = [];

  const allPaths = import.meta.glob('/src/notes/**/*.dir', { eager: true });
  const paths = Object.entries(allPaths).filter(([path]) =>
    path.includes(`/notes/${subjectSlug}/`));

  for (const path of paths) {
    const file = path[0];
    const slug = file.split('/').at(-1)?.replace('.dir', '');

    if (file && slug) {
      const category: Category = { title: slug, slug, subject: subjectSlug };
      categories.push(category);
    }
  }
  
  return categories;
}

export async function load({ params }) {
  let categories = await getCategories(params.subject);
  return { categories, subject: params.subject };
}
