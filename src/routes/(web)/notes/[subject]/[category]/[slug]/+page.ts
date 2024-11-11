import { error } from '@sveltejs/kit'

export async function load({ params }) {
  try {
    const post = await import(`../../../../../../notes/${params.subject}/${params.category}/${params.slug}.svx`)
    return {
	  content: post.default,
	  meta: post.metadata
	}
  } catch (e) {
	error(404, `Could not find ${params.slug}`)
  }
}
