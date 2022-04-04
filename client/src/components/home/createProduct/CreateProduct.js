import React, {useState, useContext} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: '',
    content: '',
    category:''
}

function CreateProduct() {
    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)

  const [isAdmin] = state.userAPI.isAdmin
  const [token] = state.token
  const handleUpload = async e => {
    e.preventDefault()
    try {
      if(!isAdmin) return alert("You're not an Admin")
      const file = e.target.files[0]
      
      if(!file) return alert("File not exist.")

      if(file.size > 1024*1024) //1mb
        return alert("Size too large!")

      if(file.type !== 'image/jpeg' && file.type !== 'image/png')
        return alert("File format is incorrect.")

      let formData = new FormData()
      formData.append('file',file)

      setLoading(true)
      const res = await axios.post('/api/upload', formData, {
        headers: {'content-type': 'multipart/form-data', Authorization: token}
      })
    setLoading(false)
    setImages(res.data)


    } catch (err) {
      alert(err.response.data.msg)
    }
  }

    const styleUpload = {
      display: images ? "block" : "none"
    }


  return (
    <div className="creat_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" onchange={handleUpload}/>
        {
          loading ? <div id="file_img" ><Loading /></div>
          :<div id="file_img" style={styleUpload}>
          <img src={images ? images.url : ''} alt=""/>
          <span>X</span>
        </div>
        }
        
      </div>
    <form>
      <div className="row">
        <label htmlFor="product_id">Product ID</label>
        <input type="text" name="product_id" id="product_id" required
        value={product.product_id} />
      </div>

      <div className="row">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" required
        value={product.title} />
        </div>

        <div className="row">
           <label htmlFor="price">Price</label>
           <input type="number" name="price" id="price" required
          value={product.price} />
        </div>

        <div className="row">
           <label htmlFor="description">Description</label>
           <textarea type="text" name="description" id="description" required
          value={product.description} rows="5"/>
        </div>

        <div className="row">
           <label htmlFor="content">Content</label>
           <textarea type="text" name="content" id="content" required
          value={product.content} rows="7"/>
        </div>

        <div className="row">
           <label htmlFor="categories">Categories: </label>
           <select name="category" value={product.category}>
             <option value="">Please select a category</option>
             {
               categories.map(category => {
                 <option value={category._id} key={category._id}>
                   {category.name}
                   </option>
               })
             }
           </select>
        </div>

        <button type="submit">Create</button>
    </form>
    </div>
  )
}

export default CreateProduct