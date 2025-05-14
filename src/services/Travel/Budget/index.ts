const BALANCE_KEY = 'budget_balance';
const BUDGET_ITEMS_KEY = 'budget_items';

import type { BudgetItem } from './typings';

// BALANCE
export const getBalanceFromStorage = (): number | null => {
	const stored = localStorage.getItem(BALANCE_KEY);
	return stored ? Number(stored) : null;
};

export const saveBalanceToStorage = (value: number) => {
	localStorage.setItem(BALANCE_KEY, value.toString());
};

// BUDGET ITEMS
export const getBudgetFromStorage = (): BudgetItem[] | null => {
	const stored = localStorage.getItem(BUDGET_ITEMS_KEY);
	return stored ? JSON.parse(stored) : null;
};

export const saveBudgetToStorage = (items: BudgetItem[]) => {
	localStorage.setItem(BUDGET_ITEMS_KEY, JSON.stringify(items));
};