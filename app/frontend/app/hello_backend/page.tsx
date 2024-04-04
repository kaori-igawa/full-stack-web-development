'use client'

import axios from "axios"
import { useEffect, useState } from "react"

export default function Page() {
  const [data, setDate] = useState({message: ''})

  async function getMessage() {
    const res = await axios.get('/api/hello/backend')
    const data = await res.data
    setDate(data);
  }

  useEffect(() => {
    getMessage();
  }, [])

  // useEffect(() => {
  //   axios.get('/api/hello/backend')
  //     .then((res)=> res.data)
  //     .then((data) => {
  //       setDate(data);
  //     })
  // }, [])

  return <div>hello {data.message}!</div>
}