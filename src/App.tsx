import React, { useState, useEffect, useReducer } from 'react'
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
} from '@chakra-ui/react'
import ReactAudioPlayer from 'react-audio-player'
import MeaningsList from './components/meaning_list'
import { MdPlayArrow, MdSearch, MdShuffle } from 'react-icons/md'
import { type Action, type AppState } from './types'
import { search } from './services/search_word'

const config = {
  initialColorMode: 'dark', // Puedes cambiarlo a 'light' si deseas el modo claro por defecto
  useSystemColorMode: true, // Habilitar para permitir que los usuarios usen la configuración del sistema
  fonts: {
    heading: '\'Libre Baskerville\', serif',
    body: '\'Raleway\', sans-serif'
  }
}

const theme = extendTheme({ config })

function capitalizeString (str: string): string {
  if (typeof str !== 'string' || str.length === 0) {
    return '' // Retorna una cadena vacía si el input no es un string o está vacío
  }

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Define el estado inicial
const initialState: AppState = {
  loading: false,
  result: undefined
}
// Define el reducer que manejará las acciones y actualización del estado
const reducer = (state: AppState, action: Action): AppState => {
  if (action.type === 'LOADING') {
    return { ...state, loading: true, result: undefined }
  }

  if (action.type === 'SEARCH_SUCCESS') {
    return { ...state, loading: false, result: action.payload }
  }

  if (action.type === 'SEARCH_FAILURE') {
    return { ...state, loading: false, result: undefined }
  }

  return state
}

function App (): JSX.Element {
  const [word, setWord] = useState('')
  const [state, dispatch] = useReducer(reducer, initialState)
  const [audio, setAudio] = useState<string>('')
  const [searchText, setsearchText] = useState('')

  useEffect(() => {
    dispatch({ type: 'LOADING' })

    if (word !== '') {
      search(word)
        .then((wordResult) => {
          if (wordResult == null) {
            dispatch({ type: 'SEARCH_FAILURE' })
          } else {
            dispatch({ type: 'SEARCH_SUCCESS', payload: wordResult })
          }
        })
        .catch((error) => {
          console.error(error)
          dispatch({ type: 'SEARCH_FAILURE' })
        })
    } else {
      dispatch({ type: 'LOADING' })
    }

    setAudio('')
  }, [word])

  const handleSearch = (e: React.SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setWord(searchText)
  }

  const handleRandomWord = async (): Promise<void> => {
    await fetch('https://random-word.ryanrk.com/api/en/word/random')
      .then(async res => await res.json())
      .then(word => { setWord(word); setsearchText(word) })
      .catch(e => { console.error(e); return [] })
  }

  const getPhoneticLabel = (phoneticText: string): string => {
    const label = phoneticText.match(/(?!-)(.{2})(?=.mp3)/g)
    if (label == null) return ''
    return ` - ${label[0]}`
  }

  const handleOnChangeSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setsearchText(e.target.value)
  }

  const changeSearch = (word: string): void => {
    setsearchText(word)
    setWord(word)
  }

  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <VStack w={'100vw'} m="10vh auto 10vh auto" minWidth="40vw" px={'3vw'}>

        <Stack spacing={2} >
          <form onSubmit={handleSearch} >
            <InputGroup size={'lg'} >
              <Input
                name='searchWord'
                onChange={handleOnChangeSearch}
                value={searchText}
                placeholder="Type any word..."
                aria-label="Type any word..."
                aria-describedby="basic-addon2"
              />
              <InputRightElement w={'100px'}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <IconButton aria-label='Random word' icon={<MdShuffle />} onClick={() => { handleRandomWord().catch(e => { console.error(e) }) }}>
                    Random
                  </IconButton>
                  <IconButton aria-label='Search' icon={<MdSearch />} type='submit'>
                    Search
                  </IconButton>
                </Stack>
              </InputRightElement>
            </InputGroup>
          </form>

          {state.loading && (
            <Box p={6}>
              <p >Search for a english word.</p>
            </Box>
          )}
          {state.result === undefined && !state.loading && (
            <Box p={6}>
              <p>No result found.</p>
            </Box>
          )}
          {state.result !== undefined && (
            <Grid templateColumns="repeat(1, 1fr)" p={1}>
              <GridItem>
                <Flex direction={'row'} justifyContent="space-between" alignItems={'center'}>
                  <Flex direction={'column'}>
                    <Heading as={'h1'} fontWeight={'bold'} fontFamily={'Libre Baskerville'} fontSize={'xxxl'}>
                      {capitalizeString(state.result[0]?.word)}
                    </Heading>
                    {
                      <Wrap direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        {state.result[0]?.phonetics?.map((phonetic, i) => (
                          phonetic.text !== '' // null
                            ? (

                              <Flex direction={'row'} key={`${phonetic.text}_${i}`} justifyContent='space-evenly'>
                                <Box
                                  as="div"
                                  cursor="pointer"
                                  onClick={() => { setAudio(phonetic.audio) }}
                                >
                                  <Text color={
                                    (phonetic.audio !== '')
                                      ? audio === phonetic.audio
                                        ? 'green'
                                        : 'IndianRed'
                                      : 'gray'
                                  }>{
                                      `${phonetic.text} ${getPhoneticLabel(phonetic.audio)}`
                                    }</Text>
                                </Box>
                                {state.result != null && i !== state.result[0]?.phonetics.length - 1 && (
                                  <Divider orientation="vertical" mx="2" borderColor="gray.300" />
                                )}
                              </Flex>
                              )
                            : ''
                        ))}
                      </Wrap>
                    }
                  </Flex>
                  <Box>

                    {audio !== ''
                      ? (
                        <ReactAudioPlayer id='audio-player' src={audio} autoPlay={false} />
                        )
                      : null}
                    <IconButton
                      aria-label="Play"
                      borderRadius="50%" // Hace que el botón sea redondo
                      bgColor={audio === '' ? 'gray' : 'DarkKhaki'} // Cambia el color según la disponibilidad de audio
                      width="60px" // Ajustamos el ancho del botón para centrarlo
                      height="60px" // Ajustamos el alto del botón para centrarlo
                      icon={<MdPlayArrow />}
                      onClick={(): void => {
                        const audioElement = document.getElementById('audio-player') as HTMLAudioElement
                        if (audioElement != null && audio !== '') audioElement.play().catch(e => { console.log(e) })
                      }}
                      isDisabled={audio == null || audio === ''}
                    />
                  </Box>
                </Flex>
              </GridItem>

              <GridItem justifySelf={'center'}>
                <MeaningsList changeWord={changeSearch} meanings={state.result[0]?.meanings}></MeaningsList>
              </GridItem>
            </Grid>
          )}
        </Stack>
      </VStack>
    </ChakraProvider>
  )
}

export default App
