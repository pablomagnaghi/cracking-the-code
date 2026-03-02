import {
  FinancialManager,
  Category,
} from '../../src/system-design/07-personal-financial-manager';

describe('FinancialManager', () => {
  let manager: FinancialManager;

  beforeEach(() => {
    manager = new FinancialManager();
  });

  test('adds transactions with unique IDs', () => {
    const t1 = manager.addTransaction(50, Category.FOOD, '2024-01-05', 'Groceries');
    const t2 = manager.addTransaction(100, Category.HOUSING, '2024-01-01', 'Rent');
    expect(t1.id).not.toBe(t2.id);
    expect(t1.amount).toBe(50);
    expect(t1.category).toBe(Category.FOOD);
  });

  test('retrieves transactions filtered by date range', () => {
    manager.addTransaction(50, Category.FOOD, '2024-01-05', 'Groceries');
    manager.addTransaction(100, Category.HOUSING, '2024-02-01', 'Rent');
    manager.addTransaction(30, Category.ENTERTAINMENT, '2024-03-10', 'Movie');

    const jan = manager.getTransactions('2024-01-01', '2024-01-31');
    expect(jan).toHaveLength(1);
    expect(jan[0].category).toBe(Category.FOOD);
  });

  test('calculates spending by category', () => {
    manager.addTransaction(50, Category.FOOD, '2024-01-01', 'Groceries');
    manager.addTransaction(30, Category.FOOD, '2024-01-15', 'Restaurant');
    manager.addTransaction(1200, Category.HOUSING, '2024-01-01', 'Rent');
    manager.addTransaction(3000, Category.INCOME, '2024-01-01', 'Salary');

    const spending = manager.getSpendingByCategory();
    expect(spending.get(Category.FOOD)).toBe(80);
    expect(spending.get(Category.HOUSING)).toBe(1200);
    expect(spending.has(Category.INCOME)).toBe(false); // Income excluded
  });

  test('calculates total spending and income', () => {
    manager.addTransaction(50, Category.FOOD, '2024-01-01', 'Groceries');
    manager.addTransaction(1200, Category.HOUSING, '2024-01-01', 'Rent');
    manager.addTransaction(3000, Category.INCOME, '2024-01-01', 'Salary');

    expect(manager.getTotalSpending()).toBe(1250);
    expect(manager.getTotalIncome()).toBe(3000);
  });

  test('sets budgets and generates over-budget recommendations', () => {
    manager.setBudget(Category.FOOD, 200);
    manager.addTransaction(150, Category.FOOD, '2024-01-10', 'Groceries');
    manager.addTransaction(100, Category.FOOD, '2024-01-20', 'Restaurant');

    const recs = manager.getRecommendations();
    expect(recs.length).toBeGreaterThanOrEqual(1);
    expect(recs[0]).toContain('over budget');
    expect(recs[0]).toContain('FOOD');
    expect(recs[0]).toContain('$50.00');
  });

  test('generates near-budget warning (>90%)', () => {
    manager.setBudget(Category.FOOD, 100);
    manager.addTransaction(95, Category.FOOD, '2024-01-10', 'Groceries');

    const recs = manager.getRecommendations();
    expect(recs.length).toBeGreaterThanOrEqual(1);
    expect(recs[0]).toContain('Warning');
    expect(recs[0]).toContain('95%');
  });

  test('generates recommendation when spending is high relative to income', () => {
    manager.addTransaction(5000, Category.INCOME, '2024-01-01', 'Salary');
    manager.addTransaction(4500, Category.HOUSING, '2024-01-01', 'Rent');

    const recs = manager.getRecommendations();
    const highSpendingRec = recs.find((r) => r.includes('income'));
    expect(highSpendingRec).toBeDefined();
    expect(highSpendingRec).toContain('90%');
  });

  test('returns no recommendations when spending is under budget', () => {
    manager.setBudget(Category.FOOD, 500);
    manager.addTransaction(100, Category.FOOD, '2024-01-10', 'Groceries');
    manager.addTransaction(5000, Category.INCOME, '2024-01-01', 'Salary');

    const recs = manager.getRecommendations();
    expect(recs).toHaveLength(0);
  });
});
