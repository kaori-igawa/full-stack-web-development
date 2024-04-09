'use client'

import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from "react";
import productsData from './sample/dummy_products.json';
import Link from 'next/link';

type ProductData = {
  id: number | null;
  name: string;
  price: number;
  description: string;
}

export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 読み込みデータを保持
  const [data, setData] = useState<Array<ProductData>>([]);

  useEffect(() => {
    setData(productsData);
  }, [])

  const [id, setId] = useState<number | null>(0);

  // submit時のactionを分岐させる
  const [action, setAction] = useState<string>('');

  const onSubmit = (e: any): void => {
    const data: ProductData = {
      id: id,
      name: e.name,
      price: Number(e.price),
      description: e.description,
    };
    // actionによってHTTPメソッドと使用するパラメーターを切り替える
    if (action === 'add') {
      handleAdd(data);
    } else if(action === 'update') {
      if (data.id === null) return;
      handleEdit(data);
    } else if(action === 'delete') {
      if (data.id === null) return;
      handleDelete(data.id);
    }
  };

  // 新規登録処理
  const handleShowNewRow = () => {
    setId(null);
    reset({
      name: '',
      price: '0',
      description: '',
    });
  };

  const handleAddCancel = () => {
    setId(0);
  }

  const handleAdd = (data: ProductData) => {
    setId(0);
  }

  // 更新・削除処理
  const handleEditRow = (id: number | null) => {
    const selectedProduct: ProductData = data.find((v) => v.id === id) as ProductData;
    setId(selectedProduct.id);
    reset({
      name: selectedProduct.name,
      price: selectedProduct.price,
      description: selectedProduct.description
    });
  };

  const handleEditCancel = () => {
    setId(0);
  }

  const handleEdit = (data: ProductData) => {
    setId(0);
  }

  const handleDelete = (id: number) => {
    setId(0);
  }

  return (
    <>
      <h2>商品一覧</h2>
      <button type='button' onClick={handleShowNewRow}>商品を追加する</button>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            {id === null ? (
              <tr>
                <td></td>
                <td>
                  <input type="text" id="name" {...register('name', { 
                    required: '必須項目です', 
                    maxLength: {
                      value: 100,
                      message: '100文字以内の商品名を入力してください'
                    }
                  })} />
                  {errors.name?.message && (<div>{ errors.name?.message as string}</div>)}
                </td>
                <td>
                  <input type="number" id="price" {...register('price', { 
                    required: '必須項目です', 
                    min: {
                      value: 1,
                      message: '1から99999999の数値を入力してください'
                    }, 
                    max: {
                      value: 99999999,
                      message: '1から99999999の数値を入力してください'
                    }
                  })} />
                  {errors.price?.message && (<div>{ errors.price?.message as string}</div>)}
                </td>
                <td><input type="text" id="description" {...register('description')} /></td>
                <td></td>
                <td>
                  <button type='button' onClick={() => handleAddCancel()}>キャンセル</button>
                  <button type='submit' onClick={() => setAction('add')}>登録する</button>
                </td>
              </tr>
            ): ''}
            {data.map((item: ProductData) => (
              id === item.id ? (
                <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <input type="text" id="name" {...register('name', { 
                    required: '必須項目です', 
                    maxLength: {
                      value: 100,
                      message: '100文字以内の商品名を入力してください'
                    }
                  })} />
                  {errors.name?.message && (<div>{ errors.name?.message as string}</div>)}
                </td>
                <td>
                  <input type="number" id="price" {...register('price', { 
                    required: '必須項目です', 
                    min: {
                      value: 1,
                      message: '1から99999999の数値を入力してください'
                    }, 
                    max: {
                      value: 99999999,
                      message: '1から99999999の数値を入力してください'
                    }
                  })} />
                  {errors.price?.message && (<div>{ errors.price?.message as string}</div>)}
                </td>
                <td><input type="text" id="description" {...register('description')} /></td>
                <td></td>
                <td>
                  <button type='button' onClick={() => handleEditCancel()}>キャンセル</button>
                  <button type='submit' onClick={() => setAction('update')}>更新する</button>
                  <button type='submit' onClick={() => setAction('delete')}>削除する</button>
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
      </form>
    </>
  )
}