// models/budget/index.ts
import { useMemoizedFn } from 'ahooks';
import { useState } from 'react';
import type { BudgetItem } from '@/services/Travel/Budget/typings';
import {
	getBudgetFromStorage,
	getBalanceFromStorage,
	saveBudgetToStorage,
	saveBalanceToStorage,
} from '@/services/Travel/Budget/index';

export default () => {
	const [balance, setBalance] = useState<number>(() => getBalanceFromStorage() ?? 0);
	const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(() => getBudgetFromStorage() ?? []);

	// Tổng chi
	const totalBudget = budgetItems.reduce((sum, item) => sum + item.amount, 0);

	// Vượt ngân sách
	const isOverBudget = totalBudget > balance;

	// Cập nhật số tiền hiện có
	const updateBalance = useMemoizedFn((newBalance: number) => {
		setBalance(newBalance);
		saveBalanceToStorage(newBalance);
	});

	// Thêm ngân sách
	const addBudgetItem = useMemoizedFn((item: BudgetItem) => {
		const updated = [...budgetItems, item];
		setBudgetItems(updated);
		saveBudgetToStorage(updated);
	});

	// Xoá ngân sách
	const removeBudgetItem = useMemoizedFn((id: string) => {
		const updated = budgetItems.filter((item) => item.id !== id);
		setBudgetItems(updated);
		saveBudgetToStorage(updated);
	});

	return {
		balance,
		budgetItems,
		totalBudget,
		isOverBudget,
		updateBalance,
		addBudgetItem,
		removeBudgetItem,
	};
};