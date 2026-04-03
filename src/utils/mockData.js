export const categories = [
  'Food & Dining',
  'Shopping',
  'Transportation',
  'Entertainment',
  'Housing',
  'Utilities',
  'Health',
  'Salary',
  'Freelance',
  'Investment'
];

export const initialTransactions = [
  { id: '1', date: '2024-03-01', amount: 3500, category: 'Salary', type: 'income', description: 'Monthly Salary' },
  { id: '2', date: '2024-03-02', amount: 120, category: 'Food & Dining', type: 'expense', description: 'Grocery Store' },
  { id: '3', date: '2024-03-05', amount: 45, category: 'Transportation', type: 'expense', description: 'Uber Ride' },
  { id: '4', date: '2024-03-07', amount: 800, category: 'Housing', type: 'expense', description: 'Rent' },
  { id: '5', date: '2024-03-10', amount: 150, category: 'Shopping', type: 'expense', description: 'Clothing' },
  { id: '6', date: '2024-03-12', amount: 500, category: 'Freelance', type: 'income', description: 'Website Project' },
  { id: '7', date: '2024-03-15', amount: 60, category: 'Utilities', type: 'expense', description: 'Electricity Bill' },
  { id: '8', date: '2024-03-18', amount: 200, category: 'Entertainment', type: 'expense', description: 'Concert Tickets' },
  { id: '9', date: '2024-03-20', amount: 100, category: 'Health', type: 'expense', description: 'Pharmacy' },
  { id: '10', date: '2024-03-22', amount: 30, category: 'Food & Dining', type: 'expense', description: 'Coffee Shop' },
  { id: '11', date: '2024-03-25', amount: 400, category: 'Investment', type: 'income', description: 'Dividends' },
  { id: '12', date: '2024-03-28', amount: 150, category: 'Shopping', type: 'expense', description: 'Electronics' },
];

export const generateChartData = (transactions) => {
  // Balance Trend Data
  const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
  let runningBalance = 0;
  const trendData = sortedTransactions.reduce((acc, curr) => {
    runningBalance += curr.type === 'income' ? curr.amount : -curr.amount;
    acc.push({
      date: curr.date,
      balance: runningBalance,
      income: curr.type === 'income' ? curr.amount : 0,
      expense: curr.type === 'expense' ? curr.amount : 0,
    });
    return acc;
  }, []);

  // Spending Breakdown
  const breakdownData = categories
    .filter(cat => cat !== 'Salary' && cat !== 'Freelance' && cat !== 'Investment')
    .map(category => {
      const total = transactions
        .filter(t => t.category === category && t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      return { name: category, value: total };
    })
    .filter(item => item.value > 0);

  return { trendData, breakdownData };
};
