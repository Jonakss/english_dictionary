import { TMeaning } from '../types';
import Meaning from './meaning';
import { Stack } from '@chakra-ui/react';

type Props = {
    meanings: TMeaning[]
}

const MeaningsList = (props: Props) => {
    let meanings = props.meanings
    if (!meanings == null) { console.log("!m"); return null;}
    return (
        <Stack>
            <>
                {meanings.map((meanign: TMeaning) => {
                    <Meaning key={meanign.partOfSpeech} meaning={meanign} />
                })}
            </>
        </Stack>
    )
};


export default MeaningsList;