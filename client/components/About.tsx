'use client'

import {Box, Button, Heading, Text, VStack} from '@chakra-ui/react'
import {Meta} from '@/type'
import {ExternalLinkIcon} from 'lucide-react'
import Link from 'next/link'
import {ServerImage} from './ui/server-image'

type AboutProps = {
  meta: Meta
}

export function About({meta}: AboutProps) {
  return (
    <Box mx={'auto'} maxW={'750px'} mb={12}>
      <Heading textAlign={'center'} fontSize={'xl'} mb={5}>About</Heading>
      <ServerImage
        src={'/meta/reporter.png'}
        mx={'auto'}
        mb={5}
        objectFit={'cover'}
        maxW={'250px'}
        alt={meta.reporter}
      />
      <Text mb={5} whiteSpace={'pre-line'}>
        {meta.message}
      </Text>
      <VStack>
        {meta.webLink && (
          <Link href={meta.webLink} target={'_blank'} rel={'noopener noreferrer'}>
            <Button size={'2xl'} minW={'300px'} bgColor={meta.brandColor || '#2577B1'}>
              <ServerImage src={'/meta/icon.png'} w={30} alt={meta.reporter}/>
              {meta.reporter}のページへ
              <ExternalLinkIcon/>
            </Button>
          </Link>
        )}
      </VStack>
    </Box>
  )
}
