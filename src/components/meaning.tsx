import { type TMeaning } from '../types'
import { Text, ListItem, Flex, Divider, Box, Wrap, WrapItem, UnorderedList, HStack } from '@chakra-ui/react'

interface Props {
  meaning: TMeaning
  key?: string
}

function Meaning (props: Props): JSX.Element | null {
  const meaning = props.meaning
  if (meaning == null) return null

  return (
        <div>
            <div>
                <Flex direction="column">
                    <Flex align={'center'}>
                        <Text fontWeight={'bold'}>{meaning.partOfSpeech}</Text>
                        <Divider orientation="horizontal" mx="3" borderColor="gray.300" />
                    </Flex>
                    <Text fontSize={'2xl'} color={'grey'} padding=".5em">Meaning</Text>
                    <Box pl={'2.5em'} pb="2em">
                        <UnorderedList listStyleType="none" >
                            {meaning.definitions.map((definition) => (
                                <ListItem key={definition.definition.slice(5)} listStyleType="disc">
                                    {definition.definition}
                                    {definition.example != null && (
                                        <HStack>
                                            <Divider orientation="vertical" h={'5'} w={1} bgColor={'teal.100'}></Divider>
                                            <Text fontStyle="italic" color={'#5E716A'}>{definition.example}</Text>
                                        </HStack>
                                    )}
                                </ListItem>
                            ))}
                        </UnorderedList>
                    </Box>
                </Flex>

                {meaning.synonyms.length === 0
                  ? null
                  : (
                    <Box>
                        <Flex direction="row" justify="flex-start">
                            <Text fontWeight={'bold'}>Synonyms:</Text>
                        </Flex>
                        <Wrap justify="flex-start" pl={'2em'}>
                            {meaning.synonyms.map((synonym, i) => (
                                <WrapItem key={`${synonym}${i}`}>
                                    <Text>{synonym}</Text>
                                </WrapItem>
                            ))}
                        </Wrap>
                    </Box>
                    )}

                {meaning.antonyms.length === 0
                  ? null
                  : (
                    <Box>
                        <Flex direction="row" justify="flex-start">
                            <Text fontWeight={'bold'}>Antonyms:</Text>
                        </Flex>
                        <Wrap justify="flex-start" pl={'2em'}>
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
  )
}

export default Meaning
