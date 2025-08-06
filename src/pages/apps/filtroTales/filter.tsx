import { useEffect, useState } from 'react'
import data2 from "./data2.json"


const filter = () => {


interface Lista {
  BusinessName :  string;
  CreatedAt: string;
  Total: number;
}
const [data, setData] = useState <Lista[]> ([])

 useEffect (() =>{
      setData (data2)
  },[])

console.log (data)


  return (
    <div> HOLA est fil </div>
  )
}

export default filter