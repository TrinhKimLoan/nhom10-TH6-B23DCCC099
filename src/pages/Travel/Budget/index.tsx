import { Card, Row, Col, Modal } from 'antd';
import { useModel } from 'umi';
import BalanceForm from './BalanceForm';
import BudgetForm from './BudgetForm';
import BudgetChart from './BudgetChart';
import type { BudgetItem } from '@/services/Travel/Budget/typings';
import { Table } from 'antd'; // thêm dòng này trên cùng nếu chưa có

const BudgetPage: React.FC = () => {
	const { budgetItems, balance, totalBudget, addBudgetItem, removeBudgetItem, updateBalance } =
		useModel('budgetModel');

	const handleOverBudget = () => {
		if (totalBudget > balance) {
			Modal.warning({
				title: 'Vượt ngân sách!',
				content: 'Tổng ngân sách bạn đã phân bổ lớn hơn số tiền bạn đang có.',
			});
		}
	};

	const columns = [
		{
			title: 'Hạng mục',
			dataIndex: 'category',
			key: 'category',
		},
		{
			title: 'Chi phí',
			dataIndex: 'amount',
			key: 'amount',
		},
		{
			title: 'Hành động',
			key: 'action',
			render: (_: any, record: BudgetItem) => <a onClick={() => removeBudgetItem(record.id)}>Xóa</a>,
		},
	];

	return (
		<Card title='Quản lý ngân sách'>
			<Row gutter={[16, 16]}>
				<Col xs={24} md={12}>
					<BalanceForm balance={balance} onSubmit={updateBalance} />
				</Col>
				<Col xs={24} md={12}>
					<BudgetForm
						onSubmit={(item) => {
							addBudgetItem(item);
							handleOverBudget();
						}}
					/>
				</Col>
				<Col span={24}>
          <Table dataSource={budgetItems} columns={columns} rowKey='id' pagination={false} />
				</Col>
				<Col span={24}>
					<BudgetChart data={budgetItems} />
				</Col>
			</Row>
		</Card>
	);
};

export default BudgetPage;