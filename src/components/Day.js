import {useParams} from 'react-router-dom';
import Word from './Word';
import useFetch from '../hooks/useFetch';

export default function Day() {
    const {day}= useParams();

    const words = useFetch(`http://localhost:3001/words?day=${day}`);

    if ( words.length === 0 ) {
        return <p>Loading...</p>;
    }
    return (
        <>
            <h2>day {day}</h2>
            <table>
                <tbody>
                { words.map(word=>(
                    <Word word={word} key={word.id}/>
                ))}
                </tbody>
            </table>

        </>
    );
}