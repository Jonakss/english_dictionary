import { useState, useEffect, useRef } from 'react';
import {
  ChakraProvider,
  Stack,
  InputGroup,
  Input,
  Grid,
  GridItem,
  Text,
  Wrap,
  ColorModeScript,
  extendTheme,
  Heading,
  Flex,
  Divider,
  Box,
  IconButton,
  InputRightElement,
  VStack
} from '@chakra-ui/react';
import ReactAudioPlayer from 'react-audio-player';
import MeaningsList from './components/meaning_list';
import { MdPlayArrow, MdSearch, MdShuffle } from 'react-icons/md'
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
  const searchRef = useRef(null);
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

  const handleRandomWord = async()=>{
    let result = await fetch('https://random-word-api.herokuapp.com/word?lang=en')
    .then(res => res.json())
    .then(word => word);
    setWord(result);
  }

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <VStack w={'100vw'} m="10vh auto 10vh auto" minWidth="40vw" px={'3vw'}>

        <Stack spacing={2} >
          <form onSubmit={handleSearch} >
            <InputGroup size={"lg"} >
              <Input
                name='searchWord'
                placeholder="Type any word..."
                aria-label="Type any word..."
                aria-describedby="basic-addon2"
              />
              <InputRightElement w={'100px'}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <IconButton aria-label='Random word' icon={<MdShuffle />} onClick={handleRandomWord}>
                    Random
                  </IconButton>
                  <IconButton aria-label='Search' ref={searchRef} icon={<MdSearch />} type='submit'>
                    Search
                  </IconButton>
                </Stack>
              </InputRightElement>
            </InputGroup>
          </form>

          {result.length === 0 ? (
            <Box p={6}>
              <p >Loading...</p>
            </Box>
          ) : (
            <Grid templateColumns="repeat(1, 1fr)" p={1}>
              <GridItem>
                <Flex direction={'row'} justifyContent="space-between" alignItems={"center"}>
                  <Flex direction={"column"}>
                    <Heading as={"h1"} fontWeight={'bold'} fontFamily={'Libre Baskerville'} fontSize={'xxxl'}>
                      {capitalizeString(result[0]?.word)}
                    </Heading>
                    {
                      <Wrap direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        {result[0]?.phonetics?.map((phonetic, i) => (
                          <Flex direction={'row'} key={`${phonetic}${i}`} justifyContent='space-evenly'>
                            <Box
                              as="div"
                              cursor="pointer"
                              onClick={() => setAudio(phonetic.audio)}
                            >
                              <Text color={
                                phonetic.audio
                                  ? audio === phonetic.audio
                                    ? 'green'
                                    : 'IndianRed'
                                  : 'gray'
                              }>{phonetic.text}</Text>
                            </Box>
                            {i !== result[0].phonetics.length - 1 && (
                              <Divider orientation="vertical" mx="2" borderColor="gray.300" />
                            )}
                          </Flex>
                        ))}
                      </Wrap>
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

              <GridItem justifySelf={"center"}>
                <MeaningsList meanings={result[0]?.meanings}></MeaningsList>
              </GridItem>
            </Grid>
          )}
        </Stack>
      </VStack>
    </ChakraProvider>
  );
}

export default App;