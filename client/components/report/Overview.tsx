import {Box, Heading, Icon, Text} from '@chakra-ui/react'
import {Result} from '@/type'
import {MessagesSquareIcon} from 'lucide-react'

type Props = {
  title: Result['config']['question']
  overview: Result['overview']
  argumentsNum: number
}

export function Overview({title, overview, argumentsNum}: Props) {
  return (
    <Box mx={'auto'} maxW={'750px'} mb={10}>
      <Heading textAlign={'center'} fontSize={'xl'} mb={5}>Report</Heading>
      <Heading as={'h2'} size={'4xl'} mb={2} className={'headingColor'}>{title}</Heading>
      <Text fontWeight={'bold'} fontSize={'xl'} mb={2}><Icon mr={1}><MessagesSquareIcon
        size={20}/></Icon>{argumentsNum.toLocaleString()}議論</Text>
      <p>{overview}</p>
    </Box>
  )
}
