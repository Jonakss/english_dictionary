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
} from '@chakra-ui/react';
import ReactAudioPlayer from 'react-audio-player';
import Meaning from './components/meaning';
import { WordResult } from './types';
import { search } from './services/search_word';


const config = {
  initialColorMode: 'dark', // Puedes cambiarlo a 'light' si deseas el modo claro por defecto
  useSystemColorMode: true, // Habilitar para permitir que los usuarios usen la configuración del sistema
};

const theme = extendTheme({ config });


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
      <Center h="100vh" w="100vw">

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
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <Text>{result[0]?.word}</Text>
                <Text>{result[0]?.phonetics[0]?.text}</Text>
              </GridItem>

              <GridItem>
                {audio !== '' ? (
                  <ReactAudioPlayer id='audio-player' src={audio} autoPlay={false} />
                ) : null}

                <Button aria-label="Audio selection">
                  {result[0]?.phonetics.map((phonetic) => (
                    <Button
                      key={phonetic.audio}
                      onClick={() => {
                        setAudio(phonetic.audio);
                      }}
                      variant={phonetic.audio === audio ? 'solid' : 'outline'}
                    >
                      {phonetic.text}
                    </Button>
                  ))}
                </Button>
                <Button
                  onClick={() => {
                    const audioElement = document.getElementById('audio-player') as HTMLAudioElement;
                    if (audioElement && audio) {
                      audioElement.play();
                    }
                  }}
                  disabled={!audio}
                >
                  Play
                </Button>
              </GridItem>
            </Grid>
          )}
          <Meaning meaning={result[0]?.meanings[0] || null} />
        </Stack>
      </Center>
    </ChakraProvider>
  );
}

export default App;
export { theme }