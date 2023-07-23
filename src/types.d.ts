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