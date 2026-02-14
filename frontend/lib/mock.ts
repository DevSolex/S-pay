export const MOCK_STATS = [
  { label: "Total Revenue", value: "12,842 STX", trendValue: "8.2%", trendType: "up" as const },
  { label: "Active Customers", value: "1,204", trendValue: "15.3%", trendType: "up" as const },
  { label: "Avg. Payment", value: "45.2 STX", trendValue: "2.1%", trendType: "down" as const },
];

export const MOCK_TRANSACTIONS = [
  { id: "1", type: "Payment", amount: "50.00 STX", date: "2 mins ago", status: "Confirmed" },
  { id: "2", type: "Mint", amount: "1000 LTC", date: "15 mins ago", status: "Confirmed" },
  { id: "3", type: "Transfer", amount: "250 ETH", date: "1 hour ago", status: "Pending" },
  { id: "4", type: "Payment", amount: "12.50 STX", date: "3 hours ago", status: "Confirmed" },
];

export const ACTIVE_TOKENS = [
  { symbol: "BTC-V2", status: "Live" },
  { symbol: "ETH-V2", status: "Live" },
  { symbol: "LTC-V2", status: "Live" },
];
