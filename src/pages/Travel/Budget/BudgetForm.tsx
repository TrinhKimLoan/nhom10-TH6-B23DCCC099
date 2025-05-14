import { Form, Input, InputNumber, Button } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import type { BudgetItem } from '@/services/Travel/Budget/typings';

interface Props {
	onSubmit: (item: BudgetItem) => void;
}

const BudgetForm: React.FC<Props> = ({ onSubmit }) => {
	const [form] = Form.useForm();

	const handleFinish = (values: { category: string; amount: number }) => {
		const newItem: BudgetItem = {
			id: uuidv4(),
			...values,
		};
		onSubmit(newItem);
		form.resetFields();
	};

	return (
		<Form form={form} layout='vertical' onFinish={handleFinish}>
			<Form.Item label='Hạng mục' name='category' rules={[{ required: true, message: 'Nhập tên hạng mục' }]}>
				<Input />
			</Form.Item>
			<Form.Item label='Chi phí' name='amount' rules={[{ required: true, message: 'Nhập chi phí' }]}>
				<InputNumber min={0} style={{ width: '100%' }} />
			</Form.Item>
			<Form.Item>
				<Button type='primary' htmlType='submit' block>
					Thêm ngân sách
				</Button>
			</Form.Item>
		</Form>
	);
};

export default BudgetForm;