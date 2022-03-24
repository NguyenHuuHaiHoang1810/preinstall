import React, {useState, useContext} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: ''
}

function CreateProduct() {
    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)


  return (
    <div>

    </div>
  )
}

export default CreateProduct