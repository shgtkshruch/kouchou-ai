import {Cluster} from '@/type'
import {Box, Heading, Text} from '@chakra-ui/react'
import {MessagesSquareIcon} from 'lucide-react'

type Props = {
  label: Cluster['label']
  value: Cluster['value']
  takeaway: Cluster['takeaway']
}

export function ClusterOverview({label, value, takeaway}: Props) {
  return (
    <Box mx={'auto'} maxW={'750px'} mb={12}>
      <Box mb={2}>
        <Heading fontSize={'2xl'} className={'headingColor'} mb={1}>{label}</Heading>
        <Text fontWeight={'bold'}><MessagesSquareIcon size={20}/>{value.toLocaleString()}議論</Text>
      </Box>
      <Text>{takeaway}</Text>
    </Box>
  )
}
