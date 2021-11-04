// import axios from "axios";
import axios from "axios";
// import fetch from "node-fetch";
import React, { FC, useEffect, useState } from "react";

type Status = 'loading' | 'success' | 'error'

const Text: FC = () => {

    const [status, setStatus] = useState<Status>('loading')

    useEffect(() => {
        let isMounted = true
        const fetchUsers = async () => {
            const result = await axios('https://jsonplaceholder.typicode.com/posts')
            return result
        }
        setStatus('loading')
        fetchUsers().then((res) => {
            if (isMounted) {
                setStatus('success')
            }
        }).catch((error) => {
            if (isMounted) {
                setStatus('error')
            }
        })
        return () => {
            isMounted = false
        }
    }, [])

    if (status === 'loading') {
        return (
            <div className="">
                loading
            </div>
        )
    }
    if (status === 'error') {
        return (
            <div className="">
                error
            </div>
        )
    }

    if (status === 'success') {
        return (
            <div>
                success
            </div>
        )
    }
    return null
}


export default Text