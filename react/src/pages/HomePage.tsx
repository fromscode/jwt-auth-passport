import { NavLink } from "react-router";

export default function HomePage() {

  return (
    <>
      <h1>This is home page</h1>
      <NavLink to='/dashboard' end>Dashboard</NavLink>
      <br />
      <NavLink to='/login' end>Login</NavLink>
      <br />
      <NavLink to='/register' end>Register</NavLink>
    </>
  )
}