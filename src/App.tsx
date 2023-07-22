import { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Stack,
  InputGroup,
  Input,
  Button,
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
  IconButton
} from '@chakra-ui/react';
import ReactAudioPlayer from 'react-audio-player';
import MeaningsList from './components/meaning_list';
import {MdPlayArrow} from 'react-icons/md'
import { WordResult } from './types';
import { search } from './services/search_word';
import Meaning from './components/meaning';


const config = {
  initialColorMode: 'dark', // Puedes cambiarlo a 'light' si deseas el modo claro por defecto
  useSystemColorMode: true, // Habilitar para permitir que los usuarios usen la configuración del sistema
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
    setAudio(result[0]?.phonetics[0].audio || '')
  }, [word]);

  const handleSearch = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    let { searchWord } = e.target as typeof e.target & { searchWord: { value: string } }
    setWord(searchWord.value)
  };

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Center h="100vh" w="80vw" ml="10vw">

        <Stack spacing={2}>
          <form onSubmit={handleSearch}>
            <InputGroup>
              <Input
                name='searchWord'
                placeholder="Type any word..."
                aria-label="Type any word..."
                aria-describedby="basic-addon2"
              />
              <Button type='submit' variant="outline">
                Search
              </Button>
            </InputGroup>
          </form>

          {result.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <Grid templateColumns="repeat(2, 1fr)" alignItems={"center"}>
              <GridItem>
                <>
                  <Heading as={"h1"} fontWeight={'bold'} fontSize={'xxxl'} fontFamily={'fantasy'}>
                    {capitalizeString(result[0]?.word)}
                  </Heading>
                  <Flex>
                    {
                      <Flex alignItems="center" justify={'space-between'}>
                        {result[0]?.phonetics?.map((phonetic, i) => (
                          <>
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
                            {i !== result[0]?.phonetics.length - 1 && (
                              <Divider orientation="vertical" mx="2" borderColor="gray.300" />
                            )}
                          </>
                        ))}
                      </Flex>
                    }
                  </Flex>
                </>
              </GridItem>

              <GridItem justifySelf={"end"}>
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
              </GridItem>
              <GridItem>
                <MeaningsList meanings={result[0].meanings}></MeaningsList>
                <Meaning meaning={result[0].meanings[0]}></Meaning>
              </GridItem>
            </Grid>
          )}
        </Stack>
      </Center>
    </ChakraProvider>
  );
}

export default App;