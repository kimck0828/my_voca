import useFetch from "../hooks/useFetch"
import { useHistory} from "react-router-dom";

export default function CreateDay() {
    const history = useHistory();
    const days = useFetch("http://localhost:3001/days");
    const maxDay = days.length;

    function addDay(event) {
        const insertDay = maxDay + 1;
        event.preventDefault();
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
        }).then(res=>{
            if (res.ok) {
                alert("登録しました");
                history.push(`/day/${insertDay}`)
            }
        }).catch(e=>console.log(e));
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