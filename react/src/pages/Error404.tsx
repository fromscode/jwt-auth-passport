import { NavLink } from "react-router"

export default function Error404() {
  return <>
    <h1>  404 Page not found
      </h1>

      <NavLink to='/' end> Back to Home Page</NavLink>
  </>
}