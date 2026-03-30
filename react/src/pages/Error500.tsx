import { NavLink } from "react-router"

export default function Error500() {
  return <>
    <h1>  500 Internal Error
      </h1>

      <NavLink to='/' end> Back to Home Page</NavLink>
  </>
}