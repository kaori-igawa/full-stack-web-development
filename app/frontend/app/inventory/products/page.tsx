'use client'

import React, { useState, useEffect } from "react";
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

  // 新規登録処理
  const [shownNewRow, setShownNewRow] = useState(false);

  const handleShowNewRow = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setShownNewRow(true);
  }

  const handleAddCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setShownNewRow(false);
  }

  const handleAdd = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    // バックエンドを使用した登録処理を呼ぶ
    setShownNewRow(false);
  }

  // 更新・削除処理
  const [editingRow, setEditingRow] = useState(0);

  const handleEditRow: any = (id: number) => {
    setShownNewRow(false);
    setEditingRow(id);
  }

  const handleEditCancel: any = (id: number) => {
    setEditingRow(0);
  }

  const handleEdit: any = (id: number) => {
    setEditingRow(0);
  }

  const handleDelete: any = (id: number) => {
    setEditingRow(0);
  }

  return (
    <>
      <h2>商品一覧</h2>
      <button onClick={handleShowNewRow}>商品を追加する</button>
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
          {shownNewRow ? (
            <tr>
              <td></td>
              <td><input type="text" /></td>
              <td><input type="number" /></td>
              <td><input type="text" /></td>
              <td></td>
              <td>
                <button onClick={(event) => handleAddCancel(event)}>キャンセル</button>
                <button onClick={(event) => handleAdd(event)}>登録する</button>
              </td>
            </tr>
          ): ''}
          {data.map((item: ProductData) => (
            editingRow === item.id ? (
              <tr key={item.id}>
              <td>{item.id}</td>
              <td><input type="text" defaultValue={item.name} /></td>
              <td><input type="number" defaultValue={item.price} /></td>
              <td><input type="text" defaultValue={item.description} /></td>
              <td></td>
              <td>
                <button onClick={() => handleEditCancel(item.id)}>キャンセル</button>
                <button onClick={() => handleEdit(item.id)}>更新する</button>
                <button onClick={() =>handleDelete(item.id)}>削除する</button>
              </td>
            </tr>
            ) : (
              <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td><Link href={`/inventory/products/${item.id}`}>在庫処理</Link></td>
              <td><button onClick={() => handleEditRow(item.id)}>更新・削除</button></td>
            </tr>
            )
          ))}
        </tbody>
      </table>
    </>
  )
}