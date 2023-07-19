import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import './App.css'
import { WordResult } from './types'
import { InputGroup, Form, Button, Container, Stack, Row, Col, ButtonGroup } from 'react-bootstrap'
import * as React from 'react'
import { search } from './services/search_word'
import ReactAudioPlayer from 'react-audio-player';
import Meaning from './components/meaning'

function App() {
  const [word, setWord] = useState('')
  const [result, setResult] = useState<WordResult>([])
  const [audio, setAudio] = useState<string>('')
  
  useEffect(()=>{
    console.log(word)
    if(word == null || word === '') return;
    search(word).then(word => setResult(word));
    setAudio(result[0]?.phonetics[0].audio)
  }, [word]);
  
  const handleSearch = (e:React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    let { searchWord } = e.target as typeof e.target & { searchWord: {value: string}}
    setWord(searchWord.value)
  }

  return (
    <Container fluid>
      <Stack gap={2}>
        <Form onSubmit={handleSearch}>
          <InputGroup className="mb-3">
            <Form.Control
              name='searchWord'
              placeholder="Type any word..."
              aria-label="Type any word..."
              aria-describedby="basic-addon2"
              />
            <Button variant="outline-secondary" id="search-word" type='submit'>
              Search
            </Button>
          </InputGroup>
        </Form>
          <Row>
          <Col>
            <p>{result[0]?.word}</p>
            <p>{result[0]?.phonetics[0].text}</p>
          </Col>
          <Col> 
          {audio !== ''?
            <ReactAudioPlayer
              id='audio-player'
              src={audio}
              autoPlay={false}
            />:''
          }
          <ButtonGroup aria-label="Audio selection">
            {result[0]?.phonetics.map(phonetic => {
              return(
                <Button variant={phonetic.audio === audio? "primary" : "secondary"} key={phonetic.audio} onClick={()=>{setAudio(phonetic.audio)}}>{phonetic.text}</Button>
              )
            })}
          </ButtonGroup>
          <Button onClick={() => {let audio = document.getElementById('audio-player') as HTMLAudioElement; audio.play()}}></Button>
          </Col>
          <Meaning meaning={result[0]?result[0].meanings[0]:null}></Meaning>
          </Row>
      </Stack>
    </Container>
  )
}

export default App