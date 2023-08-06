import type { TMeaning } from '../types'
import Meaning from './meaning'
import { Stack } from '@chakra-ui/react'

interface Props {
  meanings: TMeaning[]
}

const MeaningsList = (props: Props): JSX.Element | null => {
  const meanings = props.meanings
  if (meanings == null) { return null }
  return (
        <Stack>
            <>
                {meanings.map((meanign: TMeaning) => {
                  return <Meaning key={meanign.partOfSpeech} meaning={meanign} />
                })}
            </>
        </Stack>
  )
}

export default MeaningsList
