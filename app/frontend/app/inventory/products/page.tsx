'use client'

import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import {
  Alert,
  AlertColor,
  Box,
  Button,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { 
  Add as AddIcon,
  Cancel as CancelIcon,
  Check as CheckIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import axios from '../../../plugins/axios';

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
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>('success');
  const [message, setMessage] = useState('');
  const result = (severity: AlertColor, message: string) => {
    setOpen(true);
    setSeverity(severity);
    setMessage(message);
  }

  const handleClose = (e: any, reason: any) => {
    setOpen(false);
  }

  useEffect(() => {
    axios.get('/api/inventory/products')
    .then((res) => res.data)
    .then((data) => {
      setData(data);
    })
  }, [open])

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
    axios.post('/api/inventory/products', data).then((response) => {
      result('success', '商品が登録されました')
    });
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
    axios.put(`/api/inventory/products/${data.id}`, data).then((response) => {
      result('success', '商品が更新されました')
    });
    setId(0);
  }

  const handleDelete = (id: number) => {
    axios.delete(`/api/inventory/products/${id}`).then((response) => {
      result('success', '商品が削除されました')
    });
    setId(0);
  }

  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
      <Typography variant='h5'>商品一覧</Typography>
      <Button
        variant='contained'
        startIcon={<AddIcon />}
        onClick={() => handleShowNewRow()}
      >
        商品を追加する
      </Button>
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        sx={{height: 400, width: '100%'}}
      >
        <TableContainer component={Paper}>
          <Table sx={{display: {mobile: 'none', desktop: 'table'},}}>
            <TableHead>
              <TableRow>
                <TableCell>商品ID</TableCell>
                <TableCell>商品名</TableCell>
                <TableCell>単価</TableCell>
                <TableCell>説明</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {id === null ? (
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    <TextField
                      type="text"
                      id="name"
                      {...register('name', { 
                        required: '必須項目です', 
                        maxLength: {
                          value: 100,
                          message: '100文字以内の商品名を入力してください'
                        }
                      })}
                      error={Boolean(errors.name)}
                      helperText={errors.name?.message?.toString() || ''}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      id="price" 
                      {...register('price', { 
                        required: '必須項目です', 
                        min: {
                          value: 1,
                          message: '1から99999999の数値を入力してください'
                        }, 
                        max: {
                          value: 99999999,
                          message: '1から99999999の数値を入力してください'
                        },
                      })}
                      error={Boolean(errors.price)}
                      helperText={errors.price?.message?.toString() || ''}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField type="text" id="description" {...register('description')} />
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <Button variant='outlined' startIcon={<CancelIcon />} onClick={() => handleAddCancel()}>キャンセル</Button>
                    <Button type='submit' variant='contained' startIcon={<CheckIcon />} onClick={() => setAction('add')}>登録する</Button>
                  </TableCell>
                </TableRow>
              ): ''}
              {data.map((item: ProductData) => (
                id === item.id ? (
                  <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>
                    <TextField type="text" id="name" {...register('name', { 
                        required: '必須項目です', 
                        maxLength: {
                          value: 100,
                          message: '100文字以内の商品名を入力してください'
                        }
                      })}
                      error={Boolean(errors.name)}
                      helperText={errors.name?.message?.toString() || ''}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                        type="number"
                        id="price" 
                        {...register('price', { 
                          required: '必須項目です', 
                          min: {
                            value: 1,
                            message: '1から99999999の数値を入力してください'
                          }, 
                          max: {
                            value: 99999999,
                            message: '1から99999999の数値を入力してください'
                          },
                        })}
                        error={Boolean(errors.price)}
                        helperText={errors.price?.message?.toString() || ''}
                      />
                  </TableCell>
                  <TableCell>
                    <TextField type="text" id="description" {...register('description')} />
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <Button variant='outlined' startIcon={<CancelIcon />} onClick={() => handleEditCancel()}>キャンセル</Button>
                    <Button type='submit' variant='contained' startIcon={<CheckIcon />} onClick={() => setAction('update')}>更新する</Button>
                    <IconButton aria-label='削除する' type='submit' color='warning' onClick={() => setAction('delete')}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                ) : (
                  <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell><Link href={`/inventory/products/${item.id}`}>在庫処理</Link></TableCell>
                  <TableCell>
                    <IconButton aria-label='編集する' color='primary' onClick={() => handleEditRow(item.id)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                )
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}