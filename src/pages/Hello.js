import {useEffect, useState} from "react";
import axios from "axios";

function encodeCredentials(username, password) {
    return Buffer.from(`${username}:${password}`).toString('base64');
}

const Hello = () => {

    const [hello, setHello] = useState('Hello World!');

    const username = 'testa1@a.com'; // replace with your username
    const password = 'testa1@a.com'; // replace with your password
    const encodedCredentials = encodeCredentials(username, password);

    useEffect(() => {
        axios.get('https://forum-nucs-git-angularbe-qis-projects.vercel.app/api/HelloWorld', {
            headers: {
                'Authorization': `Basic ${encodedCredentials}`
            }
        })
            .then(res => res.data)
            .then(data => {
                console.log(data);
                setHello('success!')
            })
            .catch((err) => console.error(err))
    }, []);

    return <>{hello}</>
}

export default Hello;