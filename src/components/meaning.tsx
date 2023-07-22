import { Meaning as MeaningType } from "../types";
import { Text, ListItem, OrderedList, Heading, Flex, Spacer, Box } from '@chakra-ui/react';

type Props = {
    meaning: MeaningType | undefined;
    key?: string;
};

function Meaning(props: Props) {
    const meaning = props.meaning;
    if (!meaning) return null;

    return (
        <div>
            <Flex>
                <Heading as="h4" size={"md"}>{meaning.partOfSpeech}</Heading>
                <Spacer />
            </Flex>
            <Heading as="h5" size={"xs"}>Meaning</Heading>

            <OrderedList as="ol" styleType="decimal">
                {meaning.definitions.map((definition) => (
                    <ListItem key={definition.definition.slice(5)}>
                        <div className="ms-2 me-auto">{definition.definition}</div>
                    </ListItem>
                ))}
            </OrderedList>

            {meaning.synonyms.length === 0 ? null : (
                <>
                    <Flex direction={"row"} justify="space-evenly">
                        <Box>
                            <Flex direction={"column"} justifyContent={"space-between"}>

                                <Text>Synonyms:</Text>
                            </Flex>
                        </Box>
                        <Box>
                            {meaning.synonyms.map((synonym) => (
                                <Text key={synonym}>{synonym}</Text>
                            ))}
                        </Box>
                    </Flex>
                </>
            )}

            {meaning.antonyms.length === 0 ? null : (
                <>
                    <Flex direction={"row"} justify="space-evenly">
                        <Text as="h3">Antonyms:</Text>
                        <Box>
                            {meaning.antonyms.map((antonym) => (
                                <Text key={antonym}>{antonym}</Text>
                            ))}
                        </Box>
                    </Flex>
                </>
            )}
        </div>
    );
}

export default Meaning;
