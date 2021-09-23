import {useParams} from 'react-router-dom';
import Word, { IWord } from './Word';
import useFetch from '../hooks/useFetch';
import {Link} from "react-router-dom";

export interface IDay {
    id : number
    day : string
}
export default function Day() {
    const {day} = useParams<{day : string}>();
    
    const words : IWord[] = useFetch(`http://localhost:3001/words?day=${day}`);
    const days : IDay[] = useFetch("http://localhost:3001/days");
    
    const nowDay : number = Number(day);
    const maxDay : number = days.length;
    
    if ( words.length === 0 && days.length === 0 ) {
        return <p>Loading...</p>;
    }

    function leftPage(nowDay : number, maxDay : number) {
        let left : number = 0;
        if ( nowDay > 1) {
            left = nowDay - 1;
            return (
                <div style={{ textAlign : "left", float : "left"}}>
                    <Link to={`/day/${left}`}>{`<<${left}`}</Link>
                </div>
            )
        }
        return (<></>);
    }
    function rightPage(nowDay : number, maxDay : number) {
        let right : number = 0;
        if ( nowDay < maxDay ) {
            right = nowDay + 1;
            return (
                <div style={{ textAlign : "right"}}>
                    <Link to={`/day/${right}`}>{`${right}>>`}</Link>
                </div>
            )
        }
        return (<></>);
    }
    return (
        <>
            <h2>day {day}</h2>
            {leftPage(nowDay, maxDay)}
            {rightPage(nowDay, maxDay)}

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