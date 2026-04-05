import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type User = {
    id: number,
    username: string
}

export default function Profile() {
    const [userData, setUserData] = useState<null | User>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function getUserData() {
            try {
                const response = await fetch('http://localhost:3000/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });

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
    }, [navigate]);

    if (!userData) return <>Loading...</>

    return <>
        <h1>This is your profile page</h1>
        <div>User Id: {userData.id}</div>
        <div>Name: {userData.username}</div>
    </>
}