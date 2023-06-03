import { useEffect, useState } from 'react'
import { getPost } from '@/sanity/sanity-utils'
import { PortableText } from '@portabletext/react'
import { useRouter } from 'next/router'
import { urlForImage } from '@/sanity/lib/image'
import { CopyBlock, dracula } from 'react-code-blocks'
import components from '../components/RichTextComponent'
function CodeBlock({ value }: { value: { code: string; language: string } }) {
  return (
    <div className="p-3">
      <CopyBlock
        text={value.code}
        language={value.language}
        wrapLines
        theme={dracula}
      />
    </div>
  )
}



export async function getServerSideProps({ params }: any) {
  const { slug } = params
  let res = null
  res = await getPost(slug)

  return {
    props: {
      page: res,
    },
  }
}

export default function Page({ page }: any) {
  console.log(page)
  return (
    <div className="leading-8">
      <div className="mx-auto max-w-4xl px-3 sm:px-12">
        <section
          className={
            'rounded-xl mx-auto my-4 h-96 max-w-4xl self-center rounded-lg bg-gray-700 bg-center bg-no-repeat bg-blend-multiply bg-cover'
          }
          style={{
            backgroundImage: `url(${urlForImage(page.coverImage)?.url()})`,
          }}
        >
          <div className=" px-4 py-24 text-center">
            <h1 className="mb-4 text-5xl font-extrabold leading-none tracking-tight text-white md:text-6xl lg:text-7xl">
              {page.title}
            </h1>
            <p className="mb-8 hidden text-lg font-normal text-gray-300 sm:block sm:px-16 lg:px-48 lg:text-xl">
              {page.description}
            </p>
          </div>
        </section>

        <div className="px-2 md:px-4 lg:px-6">
          <PortableText value={page.content} components={components} />
        </div>
      </div>
    </div>
  )
}
