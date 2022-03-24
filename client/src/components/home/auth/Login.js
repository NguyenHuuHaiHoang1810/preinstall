import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Login() {
    const [user, setUser] = useState({
        email:'', password: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const loginSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/user/login', {...user})

            localStorage.setItem('firstLogin', true)
            
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <div class="container">
            <form action="">
                <h1 class="title">Welcomme</h1>
                <input type="email" name="email" required
                placeholder="Email" value={user.email} onChange={onChangeInput} />
                <input type="password" name="password" required autoComplete="on"
                placeholder="Password" value={user.password} onChange={onChangeInput} />
                <button class="login">Login</button>

                <div class="reg">
                    <i class="fab fa-github"></i>
                    <i class="fab fa-google"></i>
                    <i class="fab fa-instagram"></i>
                </div>




            </form>

        </div>
    )

}
    export default Login