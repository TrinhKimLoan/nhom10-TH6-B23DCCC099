import { Form, InputNumber, Button } from 'antd';

interface Props {
	balance: number;
	onSubmit: (value: number) => void;
}

const BalanceForm: React.FC<Props> = ({ balance, onSubmit }) => {
	const [form] = Form.useForm();

	const handleFinish = (values: { balance: number }) => {
		onSubmit(values.balance);
	};

	return (
		<Form form={form} layout='vertical' onFinish={handleFinish} initialValues={{ balance }}>
			<Form.Item label='Số tiền hiện có' name='balance' rules={[{ required: true, message: 'Nhập số tiền' }]}>
				<InputNumber min={0} style={{ width: '100%' }} />
			</Form.Item>
			<Form.Item>
				<Button type='primary' htmlType='submit' block>
					Cập nhật
				</Button>
			</Form.Item>
		</Form>
	);
};

export default BalanceForm;