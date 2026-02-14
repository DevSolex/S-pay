import styles from "./TransactionTable.module.css";

const mockTransactions = [
  { id: "1", type: "Payment", amount: "50.00 STX", date: "2 mins ago", status: "Confirmed" },
  { id: "2", type: "Mint", amount: "1000 LTC", date: "15 mins ago", status: "Confirmed" },
  { id: "3", type: "Transfer", amount: "250 ETH", date: "1 hour ago", status: "Pending" },
  { id: "4", type: "Payment", amount: "12.50 STX", date: "3 hours ago", status: "Confirmed" },
];

export default function TransactionTable() {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {mockTransactions.map((tx) => (
            <tr key={tx.id}>
              <td className={styles.type}>{tx.type}</td>
              <td className={styles.amount}>{tx.amount}</td>
              <td>{tx.date}</td>
              <td>
                <span className={`${styles.status} ${styles[tx.status.toLowerCase()]}`}>
                  {tx.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
