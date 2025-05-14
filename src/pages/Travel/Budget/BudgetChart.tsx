import { Column } from '@ant-design/plots';
import type { BudgetItem } from '@/services/Travel/Budget/typings';

interface Props {
	data: BudgetItem[];
}

const BudgetChart: React.FC<Props> = ({ data }) => {
	const config = {
		data: data.map((item) => ({
			category: item.category,
			amount: item.amount,
		})),
		xField: 'category',
		yField: 'amount',
		columnWidthRatio: 0.5,
		label: {
			position: 'middle',
			style: {
				fill: '#FFFFFF',
				opacity: 0.6,
			},
		},
		meta: {
			amount: { alias: 'Chi phí' },
			category: { alias: 'Hạng mục' },
		},
	};

	return <Column {...config} />;
};

export default BudgetChart;