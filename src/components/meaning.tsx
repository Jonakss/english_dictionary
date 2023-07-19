import { Meaning } from "../types"
import { ListGroup } from 'react-bootstrap'

type Props = {
    meaning: Meaning
    key?: string
}

function Meaning(props: Props) {
    const meaning = props.meaning;
    return meaning ? (
        <div>
            <p>{meaning.partOfSpeech}</p>
            <h2>Meaning</h2>
            <ListGroup as="ol" numbered>
                {meaning.definitions.map(definition => {
                    return (<ListGroup.Item
                        key={definition.definition.slice(5)}
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            {definition.definition}
                        </div>
                    </ListGroup.Item>)
                })}
            </ListGroup>
            {
            meaning.synonyms.length === 0 ? null :
                <>
                    <h3>Synonyms:</h3> 
                    {meaning.synonyms.map((synonym) => {
                        <h5 key={synonym}>{synonym}</h5>
                    })}
                </>
            }
            {meaning.antonyms.length === 0 ? null :
                <>
                    <h3>Antonyms:</h3> 
                    {meaning.antonyms.map((antonym) => { (<p>{antonym}</p>) })}
                </>
            }
        </div>
    ) : null
}

export default Meaning