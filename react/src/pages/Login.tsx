import { useState } from "react";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState(null);
    

    async function handleLogin() {
        try {
            const res = await fetch('http://localhost:3000/login', {
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
        <form action="/login" method="post">
            <label htmlFor="username">Username: </label>
            <input type="text" id='username' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <br />
            <label htmlFor="password">Password: </label>
            <input type="text" id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <br />
            <button type='button' onClick={handleLogin}>Submit</button>
        </form>
        <p>
            {data || (data as any).message}
        </p>
    </>

}