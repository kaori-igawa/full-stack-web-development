'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Page() {
  const [data, setData] = useState({message: ''})

  async function getMessage() {
    const res = await axios.get('/api/hello_db/backend')
    const data = await res.data
    setData(data);
  }

  useEffect(() => {
    getMessage();
  }, [])

  // useEffect(() => {
  //   axios.get('/api/hello_db/backend')
  //   .then((res) => res.data)
  //   .then((data) => {
  //     setData(data);
  //   })
  // }, [])

  return <div>hello {data.message}!</div>
}