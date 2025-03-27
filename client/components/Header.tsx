'use client'

import {HStack} from '@chakra-ui/react'
import {BroadlisteningGuide} from '@/components/report/BroadlisteningGuide'
import {Meta} from '@/type'
import {ServerImage} from './ui/server-image'

type Props = {
  meta: Meta | null
}

export function Header({meta}: Props) {
  return (
    <HStack justify="space-between" mb={8} mx={'auto'} maxW={'1200px'}>
      <HStack>
        {meta && (
          <ServerImage
            src={'/meta/reporter.png'}
            mx={'auto'}
            objectFit={'cover'}
            maxH={{base: '40px', md: '60px'}}
            maxW={{base: '120px', md: '200px'}}
            alt={meta.reporter}
          />
        )}
      </HStack>
      <BroadlisteningGuide/>
    </HStack>
  )
}
