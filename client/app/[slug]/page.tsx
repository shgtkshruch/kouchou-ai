import {Meta, Report, Result} from '@/type'
import {ClientContainer} from '@/components/report/ClientContainer'
import {Header} from '@/components/Header'
import {Overview} from '@/components/report/Overview'
import {Footer} from '@/components/Footer'
import {BackButton} from '@/components/report/BackButton'
import {About} from '@/components/About'
import {Separator} from '@chakra-ui/react'
import {Metadata} from 'next'
import {getApiBaseUrl} from '../utils/api'
import {notFound} from 'next/navigation'
// import {Suspense} from 'react'
import { ClusterOverview } from '@/components/report/ClusterOverview'
import { Analysis } from '@/components/report/Analysis'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

// ISR 5分おきにレポート更新確認
export const revalidate = 300

export async function generateStaticParams() {
  try {
    const response = await fetch(getApiBaseUrl() + '/reports', {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_PUBLIC_API_KEY || '',
        'Content-Type': 'application/json'
      },
    })
    const reports: Report[] = await response.json()
    return reports
      .filter((report) => report.status === 'ready')
      .map((report) => ({
        slug: report.slug,
      }))
  } catch (_e) {
    return []
  }
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  try {
    const slug = (await params).slug
    const metaResponse = await fetch(getApiBaseUrl() + '/meta/metadata.json')
    const resultResponse = await fetch(getApiBaseUrl() + `/reports/${slug}`, {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_PUBLIC_API_KEY || '',
        'Content-Type': 'application/json'
      },
    })
    if (!metaResponse.ok || !resultResponse.ok) {
      return {}
    }
    const meta: Meta = await metaResponse.json()
    const result: Result = await resultResponse.json()
    return {
      title: `${result.config.question} - ${meta.reporter}`,
      description: `${result.overview}`,
      openGraph: {
        images: [getApiBaseUrl() + '/meta/ogp.png'],
      },
    }
  } catch (_e) {
    return {}
  }
}

export default async function Page({params}: PageProps) {
  const slug = (await params).slug
  const metaResponse = await fetch(getApiBaseUrl() + '/meta/metadata.json')
  const resultResponse = await fetch(getApiBaseUrl() + `/reports/${slug}`, {
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_PUBLIC_API_KEY || '',
      'Content-Type': 'application/json'
    },
  })

  if (!resultResponse.ok) {
    return <div>Not Found</div>
  }

  if (metaResponse.status === 404) {
    notFound()
  }

  const meta: Meta = await metaResponse.json()
  const result: Result = await resultResponse.json()

  return (
    <>
      <div className={'container'}>
        <Header meta={meta}/>
        <Overview
          title={result.config.question}
          overview={result.overview}
          argumentsNum={result.arguments.length}/>
        <ClientContainer result={result}/>
        {/* <Suspense fallback={
          <>
            <Skeleton height="534px" mb={5} mx={'auto'} w={'100%'} maxW={'1200px'}/>
          </>
        }>
          <T slug={slug}/>
        </Suspense> */}
        {result.clusters.filter(c => c.level === 1).map(c => (
          <ClusterOverview key={c.id} label={c.label} value={c.value} takeaway={c.takeaway}/>
        ))}
        <Analysis
          clusters={result.clusters}
          commentsNum={result.comment_num.toLocaleString()}
          argumentsNum={result.arguments.length.toLocaleString()}
          config={result.config}/>
        <BackButton/>
        <Separator my={12} maxW={'750px'} mx={'auto'}/>
        <About meta={meta}/>
      </div>
      <Footer meta={meta}/>
    </>
  )
}

// const T = async ({slug}: {slug: string}) => {
//   const resultResponse = await fetch(getApiBaseUrl() + `/reports/${slug}`, {
//     headers: {
//       'x-api-key': process.env.NEXT_PUBLIC_PUBLIC_API_KEY || '',
//       'Content-Type': 'application/json'
//     },
//   })

//   if (!resultResponse.ok) {
//     return <div>Not Found</div>
//   }
//   const result: Result = await resultResponse.json()

//   return (
//     <>
//       <ClientContainer result={result}/>
//     </>
//   )
// }
