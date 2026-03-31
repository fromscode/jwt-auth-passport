import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Profile() {
    const [userData, setUserData] = useState<null | any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function getUserData() {
            try {
                const response = await fetch('http://localhost:3000/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                })

                if (response.status == 401) navigate('/login');
                else if (response.status == 200) {
                    const body = await response.json();
                    setUserData(body);
                }
            }
            catch (err) {
                console.error(err);
                navigate('/')
            }
        }

        getUserData();
    }, []);

    if (!userData) return <>Loading...</>

    return <>
        <h1>This is your profile page</h1>
    </>
}