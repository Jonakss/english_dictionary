import { TMeaning } from "../types";
import { Text, ListItem, Flex, Divider, Box, Wrap, WrapItem, UnorderedList } from '@chakra-ui/react';

type Props = {
    meaning: TMeaning;
    key?: string;
};

function Meaning(props: Props) {
    const meaning = props.meaning;
    if (!meaning) return null;

    return (
        <div>
            <div>
                <Flex direction="column">
                    <Flex align={"center"}>
                        <Text fontWeight={"bold"}>{meaning.partOfSpeech}</Text>
                        <Divider orientation="horizontal" mx="3" borderColor="gray.300" />
                    </Flex>
                    <Text fontSize={"2xl"} color={"grey"} padding=".5em">Meaning</Text>
                    <Box pl={"2.5em"} pb="2em">
                        <UnorderedList listStyleType="none"  >
                            {meaning.definitions.map((definition) => (
                                <ListItem key={definition.definition.slice(5)} listStyleType="disc">
                                    {definition.definition}
                                    {definition.example && (
                                        <Flex alignItems="center" mt="1">
                                            <Box
                                                width="3px" // Ancho de la línea
                                                height="100%" // Altura de la línea igual a la altura del texto
                                                bg="red.500" // Color de la línea
                                                mr="4px" // Margen derecho para separar la línea del texto
                                            />
                                            <Text fontStyle="italic" color={'#5E716A'}>{definition.example}</Text>
                                        </Flex>
                                    )}
                                </ListItem>
                            ))}
                        </UnorderedList>
                    </Box>
                </Flex>



                {meaning.synonyms.length === 0 ? null : (
                    <Box>
                        <Flex direction="row" justify="flex-start">
                            <Text fontWeight={"bold"}>Synonyms:</Text>
                        </Flex>
                        <Wrap justify="flex-start" pl={"2em"}>
                            {meaning.synonyms.map((synonym, i) => (
                                <WrapItem key={`${synonym}${i}`}>
                                    <Text>{synonym}</Text>
                                </WrapItem>
                            ))}
                        </Wrap>
                    </Box>
                )}

                {meaning.antonyms.length === 0 ? null : (
                    <Box>
                        <Flex direction="row" justify="flex-start">
                            <Text fontWeight={"bold"}>Antonyms:</Text>
                        </Flex>
                        <Wrap justify="flex-start" pl={"2em"}>
                            {meaning.antonyms.map((antonym, i) => (
                                <WrapItem key={`${antonym}${i}`}>
                                    <Text>{antonym}</Text>
                                </WrapItem>
                            ))}
                        </Wrap>
                    </Box>
                )}
            </div>
        </div>
    );
}

export default Meaning;
