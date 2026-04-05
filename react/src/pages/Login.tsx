import { useState } from "react";
import { NavLink, useNavigate } from "react-router";

type data = {
    message: string,
    token?: string
}

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState<data | null>(null);

    const navigate = useNavigate();
    

    async function handleLogin(e: React.SubmitEvent) {
        e.preventDefault(); 
        try {
            const res = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })

            const resBody = await res.json();
            if (res.status == 200) {
                localStorage.setItem('token', resBody.token)

                navigate('/dashboard');
            }
            else if (res.status == 401) {
                setData(resBody);
            }
            else {
                setData({
                    message: 'Some unexpected error occured',
                })
            }
        }
        catch (err) { 
            console.error(err);
            setData({message: 'Some error occurred'});
        }
    }

    return <>
        <form action="/login" method="post" onSubmit={handleLogin}>
            <label htmlFor="username">Username: </label>
            <input type="text" id='username' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <br />
            <label htmlFor="password">Password: </label>
            <input type="text" id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <br />
            <button type='submit'>Submit</button>
        </form>
        <p>
            <NavLink to='/' end> Back to Home Page</NavLink>
        </p>
        <p>
            {data && data.message}
        </p>
    </>

}