export type WordResult = Word[]
export interface Word {
  word: string
  phonetic: string
  phonetics: Phonetic[]
  meanings: TMeaning[]
  license: License
  sourceUrls: string[]
}

export interface Phonetic {
  text: string
  audio: string
  sourceUrl: string
  license: License
}

export interface License {
  name: string
  url: string
}

export interface TMeaning {
  partOfSpeech: string
  definitions: Definition[]
  synonyms: string[]
  antonyms: string[]
}

export interface Definition {
  definition: string
  synonyms: string[]
  antonyms: string[]
  example?: string
}

export // Define los tipos de acción que pueden ocurrir en el reducer
type Action =
  | { type: 'LOADING' }
  | { type: 'SEARCH_SUCCESS', payload: WordResult }
  | { type: 'SEARCH_FAILURE' }

export // Define una interfaz para el estado
interface AppState {
  loading: boolean
  result: WordResult | undefined
}
