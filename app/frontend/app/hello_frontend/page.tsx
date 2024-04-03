'use client'
import axios from "axios"
import { useEffect, useState } from "react"

export default function Page() {
  const [data, setData] = useState({name: ''});

  async function getName() {
    const res = await axios.get('/api/hello')
    const data = await res.data
    setData(data);
  }

  useEffect(() => {
    getName();
  }, [])

  // useEffect(() => {
  //   axios.get('/api/hello')
  //     .then((res) => res.data)
  //     .then((data) => {
  //       setData(data)
  //     })
  // }, [])

  return <div>hello {data.name}!</div>
}