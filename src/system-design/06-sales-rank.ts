// 09.06. Sales Rank
//
// A large eCommerce company wishes to list the best-selling products,
// overall and by category. For example, one product might be the #1056th
// best-selling product overall but the #13th best-selling product under
// "Sports Equipment" and the #24th best-selling product under "Safety".
// Describe how you would design this system.
//
// Approach:
//   Maintain in-memory counters for each product's total sales and per-
//   category sales. Use a min-heap approach to efficiently retrieve the
//   top-K best-selling products. recordSale increments counters for the
//   product both globally and in each of its categories. getTopK and
//   getTopKByCategory sort by sales descending and return the top entries.
//
// Example:
//   tracker.recordSale('P1', ['Sports', 'Safety'])
//   tracker.getTopK(3) => [{ productId: 'P1', sales: 1 }, ...]

interface ProductSales {
  productId: string;
  sales: number;
}

export class SalesRankTracker {
  private overallSales: Map<string, number> = new Map();
  private categorySales: Map<string, Map<string, number>> = new Map();
  private productCategories: Map<string, Set<string>> = new Map();

  recordSale(productId: string, categories: string[]): void {
    // Update overall sales
    const current = this.overallSales.get(productId) || 0;
    this.overallSales.set(productId, current + 1);

    // Track categories for the product
    if (!this.productCategories.has(productId)) {
      this.productCategories.set(productId, new Set());
    }
    const productCats = this.productCategories.get(productId)!;

    // Update category sales
    for (const category of categories) {
      productCats.add(category);

      if (!this.categorySales.has(category)) {
        this.categorySales.set(category, new Map());
      }
      const catMap = this.categorySales.get(category)!;
      const catCurrent = catMap.get(productId) || 0;
      catMap.set(productId, catCurrent + 1);
    }
  }

  getTopK(k: number): ProductSales[] {
    const entries: ProductSales[] = [];
    for (const [productId, sales] of this.overallSales) {
      entries.push({ productId, sales });
    }
    entries.sort((a, b) => b.sales - a.sales);
    return entries.slice(0, k);
  }

  getTopKByCategory(category: string, k: number): ProductSales[] {
    const catMap = this.categorySales.get(category);
    if (!catMap) return [];

    const entries: ProductSales[] = [];
    for (const [productId, sales] of catMap) {
      entries.push({ productId, sales });
    }
    entries.sort((a, b) => b.sales - a.sales);
    return entries.slice(0, k);
  }

  getSales(productId: string): number {
    return this.overallSales.get(productId) || 0;
  }

  getRank(productId: string): number {
    const sales = this.overallSales.get(productId);
    if (sales === undefined) return -1;

    let rank = 1;
    for (const [, otherSales] of this.overallSales) {
      if (otherSales > sales) rank++;
    }
    return rank;
  }

  getCategoryRank(productId: string, category: string): number {
    const catMap = this.categorySales.get(category);
    if (!catMap) return -1;

    const sales = catMap.get(productId);
    if (sales === undefined) return -1;

    let rank = 1;
    for (const [, otherSales] of catMap) {
      if (otherSales > sales) rank++;
    }
    return rank;
  }
}
