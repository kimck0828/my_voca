import { useState } from "react";

interface IProp {
    word : IWord;
}
export interface IWord {
    "day": number,
    "eng": string,
    "kor": string,
    "isDone": boolean,
    "id": number
}

export default function Word({word : w} : IProp) {
    const [word, setWord] = useState(w);
    const [isDispMean, setDispMean] = useState(false);
    const [isDone, setDone] = useState(word.isDone);
    
    function toggleDispMean() {
        console.log("++toggleDispMean")
        setDispMean(!isDispMean);
    }
    function toggleIsDone() {
        // setDone(!isDone);
        fetch(`http://localhost:3001/words/${word.id}`,{
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(
                {...word, isDone : !isDone}
            )
        }).then(res=>{
            if (res.ok) {
                setDone(!isDone)
            }
        }).catch(e=>console.log(e));
    }

    function del() {
        if ( window.confirm("削除していいですか？") ) {
            fetch(`http://localhost:3001/words/${word.id}`,{
                method : "DELETE"
            }).then(res=>{
                if (res.ok) {
                    alert("削除しました");
                    setWord({...word, id : -1});
                }
            }).catch(e=>console.log(e));
        }
    }

    //  リロード
    if ( word.id === -1 ) {
        return null;
    }

    return (
        <tr key={word.id} className={isDone ? "off":""}>
            <td><input type="checkbox" onChange={toggleIsDone} checked={isDone}/></td>
            <td>{word.eng}</td>
            <td>{isDispMean && word.kor}</td>
            <td>
                <button className="" onClick={toggleDispMean}>意味 {!isDispMean ? "見せる": "隠す"}</button>
                <button className="btn_del" onClick={del}>削除</button>
            </td>
        </tr>
    );
}