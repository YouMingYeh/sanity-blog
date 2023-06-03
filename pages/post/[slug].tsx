import { useEffect, useState } from 'react'
import { getPost } from '@/sanity/sanity-utils'
import { PortableText } from '@portabletext/react'
import { useRouter } from 'next/router'
import { urlForImage } from '@/sanity/lib/image'
import { CopyBlock, nord } from 'react-code-blocks'

function CodeBlock({ value }: { value: { code: string; language: string } }) {
  return (
    <div className="p-3">
      <CopyBlock
        text={value.code}
        language={value.language}
        showLineNumbers={true}
        wrapLines
        theme={nord}
      />
    </div>
  )
}

const components = {
  lists: {
    ul: (props: any) => (
      <ul className="max-w-md list-inside list-disc space-y-1 text-gray-500 dark:text-gray-400">
        {props.children}
      </ul>
    ),
    li: ({ children }: any) => <li className="ml-4 list-disc">{children}</li>,
  },
  marks: {
    code: (props: any) => (
      <span className="rounded bg-gray-200 p-1 not-italic text-blue-900 dark:bg-blue-900 dark:text-blue-300">
        {props.children}
      </span>
    ),
    link: ({ href, children }: any) => (
      <a href={href} className="text-blue-500 hover:underline">
        {children}
      </a>
    ),
  },
  types: {
    code: CodeBlock,
    image: (props: any) => {
      const src = urlForImage(props.value)?.url()
      return <img src={src} alt="img" />
    },
  },
  block: {
    normal: (props: any) => <p className="text-sm">{props.children}</p>,
    h1: (props: any) => (
      <h1 className="my-5 text-4xl font-bold">{props.children}</h1>
    ),
    h2: (props: any) => (
      <h2 className="my-5 text-3xl font-bold">{props.children}</h2>
    ),
    h3: (props: any) => (
      <h3 className="my-5 text-2xl font-bold">{props.children}</h3>
    ),
    h4: (props: any) => (
      <h4 className="my-5 text-xl font-bold">{props.children}</h4>
    ),
    h5: (props: any) => (
      <h5 className="my-5 text-lg font-bold">{props.children}</h5>
    ),
    h6: (props: any) => (
      <h6 className="my-5 text-md font-bold">{props.children}</h6>
    ),
    // code: (props: any) => (
    //   <span className='not-italic bg-blue-200 rounded dark:bg-blue-900 dark:text-blue-300 text-white'></span>
    // ),
    blockquote: ({ children }: any) => (
      <blockquote className="text-xl font-semibold italic text-gray-900 dark:text-white">
        <svg
          aria-hidden="true"
          className="h-10 w-10 text-gray-400 dark:text-gray-600"
          viewBox="0 0 24 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
            fill="currentColor"
          />
        </svg>
        <p>{children}</p>
      </blockquote>
    ),
  },
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
    <div className="">
      <div className="mx-auto max-w-4xl px-3 sm:px-12">
        <section
          className={
            'rounded-xl mx-auto my-4 h-96 max-w-4xl self-center rounded-lg bg-gray-700 bg-center bg-no-repeat bg-blend-multiply'
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

        <div className="px-2 lg:px-6 md:px-4">
          <PortableText value={page.content} components={components} />
        </div>
      </div>
    </div>
  )
}
