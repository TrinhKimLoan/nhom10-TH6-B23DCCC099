export interface BudgetItem {
	id: string; // UUID
	category: string;
	amount: number;
}

export interface BudgetState {
	balance: number;
	budgetItems: BudgetItem[];
}