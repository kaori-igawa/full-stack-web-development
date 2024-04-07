'use client'

import { useState, useEffect } from "react";
import productsData from './sample/dummy_products.json';
import Link from 'next/link';

type ProductData = {
  id: number;
  name: string;
  price: number;
  description: string;
}


export default function Page() {
  const [data, setData] = useState<Array<ProductData>>([]);

  useEffect(() => {
    setData(productsData);
  }, [])

  return (
    <>
      <h2>商品一覧</h2>
      <button>商品を追加する</button>
      <table>
        <thead>
          <tr>
            <th>商品ID</th>
            <th>商品名</th>
            <th>単価</th>
            <th>説明</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: ProductData) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td><Link href={`/inventory/products/${item.id}`}>在庫処理</Link></td>
              <td><button>更新・削除</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}