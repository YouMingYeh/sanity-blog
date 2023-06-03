import { createClient, groq } from "next-sanity";
import clientConfig from './config/client-config'
import { Page } from "@/types/Page";

export async function getPosts(): Promise<Page[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "post"]{
      _id,
      _createdAt,
      title,
      "slug": slug.current
    }`
  )
}

export async function getPost(slug: string): Promise<Page> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      content,
      author,
      publishedAt,
      coverImage
    }`,
    { slug }
  )
}
