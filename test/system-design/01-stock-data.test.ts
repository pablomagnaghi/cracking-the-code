import { StockDataService } from '../../src/system-design/01-stock-data';

describe('StockDataService', () => {
  let service: StockDataService;

  beforeEach(() => {
    service = new StockDataService();
  });

  test('returns null for unknown symbol', () => {
    expect(service.getPrice('UNKNOWN')).toBeNull();
  });

  test('adds and retrieves a single stock price', () => {
    service.addPrice('AAPL', '2024-01-15', 185.5);
    const price = service.getPrice('AAPL');
    expect(price).not.toBeNull();
    expect(price!.symbol).toBe('AAPL');
    expect(price!.price).toBe(185.5);
    expect(price!.date).toBe('2024-01-15');
  });

  test('getPrice returns the most recent price', () => {
    service.addPrice('GOOG', '2024-01-01', 140.0);
    service.addPrice('GOOG', '2024-01-03', 145.0);
    service.addPrice('GOOG', '2024-01-02', 142.0);
    const latest = service.getPrice('GOOG');
    expect(latest!.price).toBe(145.0);
    expect(latest!.date).toBe('2024-01-03');
  });

  test('symbol lookup is case-insensitive', () => {
    service.addPrice('aapl', '2024-01-01', 180.0);
    expect(service.getPrice('AAPL')).not.toBeNull();
    expect(service.getPrice('aapl')!.price).toBe(180.0);
  });

  test('returns full price history in chronological order', () => {
    service.addPrice('MSFT', '2024-01-03', 380.0);
    service.addPrice('MSFT', '2024-01-01', 370.0);
    service.addPrice('MSFT', '2024-01-02', 375.0);
    const history = service.getPriceHistory('MSFT');
    expect(history).toHaveLength(3);
    expect(history[0].date).toBe('2024-01-01');
    expect(history[1].date).toBe('2024-01-02');
    expect(history[2].date).toBe('2024-01-03');
  });

  test('filters price history by date range', () => {
    service.addPrice('TSLA', '2024-01-01', 240.0);
    service.addPrice('TSLA', '2024-01-15', 250.0);
    service.addPrice('TSLA', '2024-02-01', 260.0);
    service.addPrice('TSLA', '2024-03-01', 270.0);
    const filtered = service.getPriceHistory('TSLA', '2024-01-10', '2024-02-15');
    expect(filtered).toHaveLength(2);
    expect(filtered[0].price).toBe(250.0);
    expect(filtered[1].price).toBe(260.0);
  });

  test('returns empty history for unknown symbol', () => {
    expect(service.getPriceHistory('NOPE')).toEqual([]);
  });

  test('handles multiple symbols independently', () => {
    service.addPrice('AAPL', '2024-01-01', 185.0);
    service.addPrice('GOOG', '2024-01-01', 140.0);
    expect(service.getPrice('AAPL')!.price).toBe(185.0);
    expect(service.getPrice('GOOG')!.price).toBe(140.0);
    expect(service.getPriceHistory('AAPL')).toHaveLength(1);
    expect(service.getPriceHistory('GOOG')).toHaveLength(1);
  });
});
