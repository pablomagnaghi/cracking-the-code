// 09.07. Personal Financial Manager
//
// Explain how you would design a personal financial manager (like Mint.com).
// This system would connect to your bank accounts, analyze spending habits,
// and make recommendations.
//
// Approach:
//   Model transactions with a category, amount, date, and description.
//   The FinancialManager allows adding transactions, setting category
//   budgets, querying spending by category or date range, and generating
//   simple recommendations based on spending vs. budget comparisons.
//   Categories are defined via an enum for type safety.
//
// Example:
//   manager.addTransaction({ amount: 50, category: Category.FOOD, ... })
//   manager.getSpendingByCategory() => Map { FOOD => 50, ... }
//   manager.getRecommendations() => ['You are over budget in FOOD by $10']

export enum Category {
  FOOD = 'FOOD',
  HOUSING = 'HOUSING',
  TRANSPORTATION = 'TRANSPORTATION',
  ENTERTAINMENT = 'ENTERTAINMENT',
  UTILITIES = 'UTILITIES',
  HEALTHCARE = 'HEALTHCARE',
  SHOPPING = 'SHOPPING',
  INCOME = 'INCOME',
  OTHER = 'OTHER',
}

export interface Transaction {
  id: string;
  amount: number;
  category: Category;
  date: string;
  description: string;
}

export class FinancialManager {
  private transactions: Transaction[] = [];
  private budgets: Map<Category, number> = new Map();
  private nextId: number = 1;

  addTransaction(
    amount: number,
    category: Category,
    date: string,
    description: string
  ): Transaction {
    const transaction: Transaction = {
      id: String(this.nextId++),
      amount,
      category,
      date,
      description,
    };
    this.transactions.push(transaction);
    return transaction;
  }

  setBudget(category: Category, monthlyLimit: number): void {
    this.budgets.set(category, monthlyLimit);
  }

  getTransactions(startDate?: string, endDate?: string): Transaction[] {
    return this.transactions.filter((t) => {
      if (startDate && t.date < startDate) return false;
      if (endDate && t.date > endDate) return false;
      return true;
    });
  }

  getSpendingByCategory(
    startDate?: string,
    endDate?: string
  ): Map<Category, number> {
    const spending = new Map<Category, number>();
    const filtered = this.getTransactions(startDate, endDate);

    for (const t of filtered) {
      if (t.category === Category.INCOME) continue; // Skip income
      const current = spending.get(t.category) || 0;
      spending.set(t.category, current + t.amount);
    }
    return spending;
  }

  getTotalSpending(startDate?: string, endDate?: string): number {
    const filtered = this.getTransactions(startDate, endDate);
    return filtered
      .filter((t) => t.category !== Category.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getTotalIncome(startDate?: string, endDate?: string): number {
    const filtered = this.getTransactions(startDate, endDate);
    return filtered
      .filter((t) => t.category === Category.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getRecommendations(startDate?: string, endDate?: string): string[] {
    const recommendations: string[] = [];
    const spending = this.getSpendingByCategory(startDate, endDate);

    for (const [category, budget] of this.budgets) {
      const spent = spending.get(category) || 0;
      if (spent > budget) {
        const over = spent - budget;
        recommendations.push(
          `You are over budget in ${category} by $${over.toFixed(2)}`
        );
      } else if (spent > budget * 0.9) {
        recommendations.push(
          `Warning: You have spent ${((spent / budget) * 100).toFixed(0)}% of your ${category} budget`
        );
      }
    }

    const totalIncome = this.getTotalIncome(startDate, endDate);
    const totalSpending = this.getTotalSpending(startDate, endDate);
    if (totalIncome > 0 && totalSpending > totalIncome * 0.8) {
      recommendations.push(
        `Your spending is ${((totalSpending / totalIncome) * 100).toFixed(0)}% of your income. Consider reducing expenses.`
      );
    }

    return recommendations;
  }
}
