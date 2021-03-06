import {Link} from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { IDay } from "./Day";

export default function DayList() {
    const days : IDay[] = useFetch("http://localhost:3001/days");

    if ( days.length === 0 ) {
        return <p>Loading...</p>;
    }

    return (
        <ul className="list_day">
           {days.map(day => (
                <Link to={`/day/${day.day}`} key={day.id}>
                    <li> Day {day.day} </li>
                </Link>
            ))}
        </ul>
    );
}