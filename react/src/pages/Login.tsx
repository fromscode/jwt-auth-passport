export default function Login() { 
    return <>
        <form action="/login" method="post">
            <label htmlFor="username">Username: </label>
            <input type="text" id='username' name='username'/>
            <br />
            <label htmlFor="password">Password: </label>
            <input type="text" id='password' name='password'/>
            <br />
            <button type="submit">Submit</button>
        </form>
    </>

}