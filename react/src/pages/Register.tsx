import React, {useState } from "react";
import { NavLink, useNavigate } from "react-router";

type data = {
    message: string,
    token?: string
}

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState<data | null>(null);

    const navigate = useNavigate();

    async function handleRegister(e: React.SubmitEvent) {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            const resBody = await res.json();

            if (res.status == 201) {
                localStorage.setItem('token', resBody.token);
                navigate('/dashboard');
            }
            else if (res.status == 400) {
                setData(resBody.message);
            }
            else {
                setData({message: 'Some unexpected error occured'});
            }
            
        }
        catch (err) { 
            console.error(err);
            setData({message: 'Some error occured'});
        }
        
    }
    return <>
        <form action="/register" method="post" onSubmit={handleRegister}>
            <label htmlFor="username">Username: </label>
            <input type="text" id='username' name='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
            <br />
            <label htmlFor="username">Password: </label>
            <input type="text" id='password' name='password'
            value={password} onChange={(e) => setPassword(e.target.value)
            }/>
            <br />
            <button type="submit">Submit</button>
        </form>
        <p>
             <NavLink to='/' end> Back to Home Page</NavLink>
        </p>
        <p>
            {data && data.message}
        </p>
    </>
}