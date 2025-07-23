import React from 'react';
import { Modal, Form, Input, DatePicker, InputNumber } from 'antd';
import type { Dayjs } from 'dayjs';
import type { DataType } from '../types/table';

export interface RecordModalProps {
  open: boolean;
  initialValues?: Partial<Omit<DataType, 'date'> & { date?: string | Dayjs }>;
  onOk: (values: { name: string; date: Dayjs; number: number }) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

const RecordModal: React.FC<RecordModalProps> = ({ open, initialValues, onOk, onCancel, isEdit }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (open) {
      form.setFieldsValue(initialValues || {});
    } else {
      form.resetFields();
    }
  }, [open, initialValues, form]);

  const handleOk = () => {
    form.validateFields().then(onOk);
  };

  return (
    <Modal
      title={isEdit ? 'Редактировать запись' : 'Добавить запись'}
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Сохранить"
      cancelText="Отмена"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Имя"
          rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="date"
          label="Дата"
          rules={[{ required: true, message: 'Пожалуйста, выберите дату' }]}
        >
          <DatePicker format="DD.MM.YYYY" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="number"
          label="Число"
          rules={[{ required: true, message: 'Пожалуйста, введите число' }]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RecordModal; 