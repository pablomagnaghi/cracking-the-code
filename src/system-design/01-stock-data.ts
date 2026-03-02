// 09.01. Stock Data
//
// Imagine you are building some sort of service that will be called by up to
// 1,000 client applications to get simple end-of-day stock price information.
// Design the client-facing service, including how the data is stored and
// delivered. You may assume the data is already available via a simple
// database or web service.
//
// Approach:
//   Use an in-memory store mapping stock symbols to a sorted list of
//   (date, price) entries. The service exposes addPrice to record new
//   end-of-day prices, getPrice to retrieve the most recent price for
//   a symbol, and getPriceHistory to return the full history within an
//   optional date range. Prices are stored chronologically for efficient
//   range queries.
//
// Example:
//   service.addPrice('AAPL', '2024-01-01', 185.50)
//   service.getPrice('AAPL') => { symbol: 'AAPL', date: '2024-01-01', price: 185.50 }

export interface StockPrice {
  symbol: string;
  date: string;
  price: number;
}

export class StockDataService {
  private data: Map<string, StockPrice[]> = new Map();

  addPrice(symbol: string, date: string, price: number): void {
    const upperSymbol = symbol.toUpperCase();
    if (!this.data.has(upperSymbol)) {
      this.data.set(upperSymbol, []);
    }
    const entry: StockPrice = { symbol: upperSymbol, date, price };
    const history = this.data.get(upperSymbol)!;

    // Insert in sorted order by date
    const insertIndex = this.findInsertIndex(history, date);
    history.splice(insertIndex, 0, entry);
  }

  getPrice(symbol: string): StockPrice | null {
    const upperSymbol = symbol.toUpperCase();
    const history = this.data.get(upperSymbol);
    if (!history || history.length === 0) {
      return null;
    }
    // Return the most recent price (last entry in sorted list)
    return history[history.length - 1];
  }

  getPriceHistory(
    symbol: string,
    startDate?: string,
    endDate?: string
  ): StockPrice[] {
    const upperSymbol = symbol.toUpperCase();
    const history = this.data.get(upperSymbol);
    if (!history || history.length === 0) {
      return [];
    }

    return history.filter((entry) => {
      if (startDate && entry.date < startDate) return false;
      if (endDate && entry.date > endDate) return false;
      return true;
    });
  }

  private findInsertIndex(history: StockPrice[], date: string): number {
    let lo = 0;
    let hi = history.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (history[mid].date < date) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }
    return lo;
  }
}
