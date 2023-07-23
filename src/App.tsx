import { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Stack,
  InputGroup,
  Input,
  Grid,
  GridItem,
  Text,
  Center,
  ColorModeScript,
  extendTheme,
  Heading,
  Flex,
  Divider,
  Box,
  Button,
  IconButton,
  InputRightElement,
  useColorMode
} from '@chakra-ui/react';
import ReactAudioPlayer from 'react-audio-player';
import MeaningsList from './components/meaning_list';
import { MdPlayArrow, MdSearch } from 'react-icons/md'
import { WordResult } from './types';
import { search } from './services/search_word';


const config = {
  initialColorMode: 'dark', // Puedes cambiarlo a 'light' si deseas el modo claro por defecto
  useSystemColorMode: true, // Habilitar para permitir que los usuarios usen la configuración del sistema
  fonts: {
    heading: `'Libre Baskerville', serif`,
    body: `'Raleway', sans-serif`,
  },
};

const theme = extendTheme({ config });

function capitalizeString(str: string) {
  if (typeof str !== 'string' || str.length === 0) {
    return ''; // Retorna una cadena vacía si el input no es un string o está vacío
  }

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function App() {
  const [word, setWord] = useState('');
  const [result, setResult] = useState<WordResult>([]);
  const [audio, setAudio] = useState<string>('');

  useEffect(() => {
    console.log(word)
    if (word == null || word === '') return;
    search(word).then(word => setResult(word));
    setAudio('')
  }, [word]);

  const handleSearch = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    let { searchWord } = e.target as typeof e.target & { searchWord: { value: string } }
    setWord(searchWord.value)
  };

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Center mt={"10vh"} mb="10vh" minWidth="60vw" ml="20vw">

        <Stack spacing={2} minWidth={"50vw"}>
          <form onSubmit={handleSearch} >
            <InputGroup size={"lg"}>
              <Input
                name='searchWord'
                placeholder="Type any word..."
                aria-label="Type any word..."
                aria-describedby="basic-addon2"
              />
              <InputRightElement>
                <IconButton aria-label='Search' icon={<MdSearch />} type='submit'>
                  Search
                </IconButton>
              </InputRightElement>
            </InputGroup>
          </form>

          {result.length === 0 ? (
            <Box p={6}>
              <p >Loading...</p>
            </Box>
          ) : (
            <Grid templateColumns="repeat(1, 1fr)" p={4}>
              <GridItem>
                <Flex direction={'row'} justifyContent="space-between" alignItems={"center"}>
                  <Flex direction={"column"}>
                    <Heading as={"h1"} fontWeight={'bold'} fontFamily={'Libre Baskerville'} fontSize={'xxxl'}>
                      {capitalizeString(result[0]?.word)}
                    </Heading>
                    {
                      <Flex direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        {result[0]?.phonetics?.map((phonetic, i) => (
                          <Box key={`${phonetic}${i}`}>
                            <Box
                              as="div"
                              cursor="pointer"
                              onClick={() => setAudio(phonetic.audio)}
                              display="inline-block"
                            >
                              <Text color={
                                phonetic.audio
                                  ? audio === phonetic.audio
                                    ? 'green'
                                    : 'IndianRed'
                                  : 'gray'
                              }>{phonetic.text}</Text>
                            </Box>
                              {i !== result[0].phonetics.length -1 && (
                                <Box as="div" display="inline-block">

                                  <Divider orientation="vertical" mx="2" borderColor="gray.300" />
                                </Box>
                              )}
                          </Box>
                        ))}
                      </Flex>
                    }
                  </Flex>
                  <Box>

                    {audio !== '' ? (
                      <ReactAudioPlayer id='audio-player' src={audio} autoPlay={false} />
                    ) : null}
                    <IconButton
                      aria-label="Play"
                      borderRadius="50%" // Hace que el botón sea redondo
                      bgColor={audio ? 'DarkKhaki' : 'gray'} // Cambia el color según la disponibilidad de audio
                      width="60px" // Ajustamos el ancho del botón para centrarlo
                      height="60px" // Ajustamos el alto del botón para centrarlo
                      icon={<MdPlayArrow />}
                      onClick={() => {
                        const audioElement = document.getElementById('audio-player') as HTMLAudioElement;
                        if (audioElement && audio) {
                          audioElement.play();
                        }
                      }}
                      isDisabled={!audio || audio === ''}
                    />
                  </Box>
                </Flex>
              </GridItem>

              <GridItem justifySelf={"end"} w="60vw">
                <MeaningsList meanings={result[0]?.meanings}></MeaningsList>
              </GridItem>
            </Grid>
          )}
        </Stack>
      </Center>
    </ChakraProvider>
  );
}

export default App;