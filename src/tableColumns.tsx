import React from 'react';
import { Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import type { DataType } from './types/table';

export const getColumns = (
  onEdit: (record: DataType) => void,
  onDelete: (key: string) => void
): ColumnsType<DataType> => [
  {
    title: 'Имя',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Дата',
    dataIndex: 'date',
    sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    render: (date: string) => dayjs(date).format('DD.MM.YYYY'),
  },
  {
    title: 'Число',
    dataIndex: 'number',
    sorter: (a, b) => a.number - b.number,
  },
  {
    title: 'Действия',
    dataIndex: 'actions',
    render: (_, record) => (
      <Space>
        <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
        <Button icon={<DeleteOutlined />} danger onClick={() => onDelete(record.key)} />
      </Space>
    ),
  },
]; 