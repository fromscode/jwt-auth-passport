import {useState } from "react";
import { NavLink, useNavigate } from "react-router";

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState<string | null>(null);

    const navigate = useNavigate();

    async function handleRegister(username: string, password: string) {
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
                setData('Some unexpected error occured');
            }
            
        }
        catch (err) { 
            console.error(err);
            setData('Some error occured');
        }
        
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