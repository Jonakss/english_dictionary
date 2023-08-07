import type { TMeaning } from '../types'
import Meaning from './meaning'
import { Stack } from '@chakra-ui/react'

interface Props {
  meanings?: TMeaning[]
  changeWord: (synonym: string) => void
}

const MeaningsList = (props: Props): JSX.Element | null => {
  const meanings = props.meanings
  if (meanings == null) { return null }
  return (
        <Stack>
            <>
                {meanings.map((meanign: TMeaning, i) => {
                  return <Meaning key={`${meanign.partOfSpeech}_${i}`} changeWord={props.changeWord} meaning={meanign} />
                })}
            </>
        </Stack>
  )
}

export default MeaningsList
