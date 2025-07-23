import React, { useState } from 'react';
import { Table, Button, Input, Space } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import _ from 'lodash';
import type { DataType } from './types/table';
import RecordModal from './components/RecordModal';
import { getColumns } from './tableColumns';

const initialData: DataType[] = [];

const TableCrud: React.FC = () => {
  const [data, setData] = useState<DataType[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DataType | null>(null);
  const [searchText, setSearchText] = useState('');

  
  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  function onAdd() {
    setEditingRecord(null);
    setIsModalOpen(true);
  }

  function onEdit(record: DataType) {
    setEditingRecord(record);
    setIsModalOpen(true);
  }

  function onDelete(key: string) {
    setData((prev) => prev.filter((item) => item.key !== key));
  }

  function handleModalOk(values: { name: string; date: Dayjs; number: number }) {
    const newData = {
      ...values,
      date: (values.date as Dayjs).toISOString(),
    };
    if (editingRecord) {
      setData((prev) =>
        prev.map((item) => (item.key === editingRecord.key ? { ...newData, key: editingRecord.key } : item))
      );
    } else {
      setData((prev) => [
        ...prev,
        { ...newData, key: Date.now().toString() },
      ]);
    }
    setIsModalOpen(false);
    setEditingRecord(null);
  }

  function handleModalCancel() {
    setIsModalOpen(false);
    setEditingRecord(null);
  }

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
          Добавить
        </Button>
        <Input
          placeholder="Поиск по таблице"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
        />
      </Space>
      <Table
        columns={getColumns(onEdit, onDelete)}
        dataSource={filteredData}
        rowKey="key"
        pagination={{ pageSize: 5 }}
      />
      <RecordModal
        open={isModalOpen}
        initialValues={editingRecord ? { ...editingRecord, date: dayjs(editingRecord.date) } : undefined}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        isEdit={!!editingRecord}
      />
    </div>
  );
};

export default TableCrud; 