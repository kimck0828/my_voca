import useFetch from "../hooks/useFetch"
import { useHistory} from "react-router-dom";
import { IDay } from "./Day";

export default function CreateDay() {
    const history = useHistory();
    const days : IDay[] = useFetch("http://localhost:3001/days");
    const maxDay : number = days.length;

    function addDay() : void {
        const insertDay : number = maxDay + 1;
        fetch(`http://localhost:3001/days/`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(
                {
                    day : insertDay,
                }
            )
        }).then((res : Response) =>{
            if (res.ok) {
                alert("登録しました");
                history.push(`/day/${insertDay}`)
            }
        }).catch((e: Error)=>console.log(e));
    }
    
    return (
        <>
            <p>現在の最大日:{maxDay}</p>
            <ul className="list_day">
                <button onClick={addDay}>日数追加</button>
            </ul>
        </>
    )
}