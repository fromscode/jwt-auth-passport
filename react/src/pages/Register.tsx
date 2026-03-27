export default function Register() {
    return <>
        <form action="/register" method="post">
            <label htmlFor="username">Username: </label>
            <input type="text" id='username' name='username'/>
            <br />
            <label htmlFor="username">Password: </label>
            <input type="text" id='password' name='password'/>
            <br />
            <button type="submit">Submit</button>
        </form>
    </>
}