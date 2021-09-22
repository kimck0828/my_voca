import { useRef, useState } from "react";
import { useHistory} from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function CreateWord() {
    const days = useFetch("http://localhost:3001/days");
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    const engRef = useRef(null);
    const korRef = useRef(null);
    const dayRef = useRef(null);

    console.log(`isLoading:${isLoading}`);
    function onSubmit(event) {
        event.preventDefault();
        if ( !isLoading ) {
            setIsLoading(!isLoading);
            console.log("isLoading toggled");
            fetch(`http://localhost:3001/words/`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(
                    {
                        day : Number(dayRef.current.value),
                        eng : engRef.current.value,
                        kor : korRef.current.value,
                        isDone : false
                    }
                )
            }).then(res=>{
                if (res.ok) {
                    console.log("fetch finished")
                    alert("登録しました");
                    history.push(`/day/${dayRef.current.value}`)
                }
            }).catch(e=>console.log(e));

        }

    }

    return (
        <form onSubmit={onSubmit}>
            <div className="input_area">
                <label>Eng</label>
                <input type="text" placeholder="computer" ref={engRef}/>
            </div>
            <div className="input_area">
                <label>kor</label>
                <input type="text" placeholder="パソコン" ref={korRef}/>
            </div>
            <div className="input_area">
                <label>day</label>
                <select ref={dayRef}>
                    {days.map(day => 
                        <option key={day.id} value={day.day}>{day.day}</option>
                    )}
                </select>
            </div>
            <button style={{opacity : isLoading ? 0.3 : 1}}>SAVE</button>
        </form>
    );
}