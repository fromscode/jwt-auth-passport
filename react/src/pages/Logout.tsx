import { useEffect, useState } from "react";;

export default function Logout() {
  const [data, setData] = useState<null | string>(null);

  useEffect(() => {
    async function logout() {
      try {
        const response = await fetch('http://localhost:3000/logout');

        if (response.status == 200) {
          localStorage.removeItem('token');
          setData('Logout successfull')
        }
        else setData((await response.json()).message);
      }
      catch (err) {
        console.error(err);
      }
    }

    logout();
  }, [])

  if (!data) return <>Logging out...</>

  return <>
    {data}
  </>
}