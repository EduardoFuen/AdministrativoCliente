import React from 'react'
import { useSelector } from 'store';


const filter = () => {

const { listPurchase } = useSelector((state) => state.purchase);


  return (
    <div> HOLA est fil </div>
  )
}

export default filter