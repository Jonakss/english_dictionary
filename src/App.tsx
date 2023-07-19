import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import './App.css'
import { WordResult } from './types'
import { InputGroup, Form, Button, Container, Stack, Row, Col } from 'react-bootstrap'
import * as React from 'react'
import { search } from './services/search_word'
import ReactAudioPlayer from 'react-audio-player';

function App() {
  const [word, setWord] = useState('')
  const [result, setResult] = useState<WordResult>([])
  
  useEffect(()=>{
    console.log(word)
    if(word == null || word === '') return;
    setResult(search(word));

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
          <ReactAudioPlayer
            id='audio-player'
            src={result[0]?.phonetics[0].audio}
            autoPlay={false}
          />
          <Button onClick={() => {let audio = document.getElementById('audio-player') as HTMLElement & { play : Function }; audio.play()}}></Button>
          </Col>
          </Row>
      </Stack>
    </Container>
  )
}

export default App
