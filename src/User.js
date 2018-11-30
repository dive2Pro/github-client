import React, { useEffect, useState } from 'react'
import {trending} from './request'

export default function User() {
    const [ repos , setTrending]  = useState([])
    const [params, setParams] = useState({})
    useEffect(() => {
        async function searchTrending() {
            const result = await trending(params).then(res => {
                console.log(res)
                return  res
            })

            // setTrending(result)
        }
        searchTrending()
    })
    return <div>
            <ul>
                {
                    repos.map( r => <li key={r.name}> {r.name} </li>)
                }
            </ul>
        </div>
}
