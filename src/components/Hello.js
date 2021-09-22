import { useState } from "react";
import UserName from "./UserName";

export default function Hello({age}){
    console.log(`propAge:${age}`)
    const [name , setName] = useState("Tom");
    const [addAge, setAge] = useState(age);

    return (
        <>
        <p>hello</p>
        {name}({addAge})
        <br />
        <UserName name={name}/>
        <br />
        <button onClick={()=>{
            setName(name === "Tom" ? "Mike" : "Tom")
        }}>changeName</button>
        <br/><button onClick={()=>{
            setAge(addAge+1)
        }}>add Age</button>

        </>
    );
}