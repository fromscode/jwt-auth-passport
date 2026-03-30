import {useState } from "react";
import { NavLink } from "react-router";

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState(null);

    async function handleRegister(username: string, password: string) {
        try {
            const res = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            const body = await res.json();
            setData(body);
        }
        catch (err) { 
            console.error(err)
        }

        if ((data as any).status != 401) console.log("authorized");
        
    }
    return <>
        <form action="/register" method="post">
            <label htmlFor="username">Username: </label>
            <input type="text" id='username' name='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
            <br />
            <label htmlFor="username">Password: </label>
            <input type="text" id='password' name='password'
            value={password} onChange={(e) => setPassword(e.target.value)
            }/>
            <br />
            <button type="button" onClick={() => handleRegister(username, password)}>Submit</button>
        </form>
        <p>
             <NavLink to='/' end> Back to Home Page</NavLink>
        </p>
        <p>
            {data && (data as any).message}
        </p>
    </>
}