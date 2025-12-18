import React, { useState, useEffect } from 'react';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');

  const API_BASE_URL = 'http://localhost:8080/api/bank';

  const fetchStatement = () => {
    fetch(`${API_BASE_URL}/statement`)
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchStatement();
  }, []);

  const onTransaction = (type) => {
    const val = parseInt(amount);

    if (isNaN(val) || val <= 0) {
      alert("Please enter a valid positive number.");
      return;
    }

    fetch(`${API_BASE_URL}/${type}?amount=${val}`, { method: 'POST' })
      .then(() => {
        setAmount('');
        fetchStatement();
      })
      .catch(err => {
        alert("Transaction failed.");
      });
  };

  const currentBalance = transactions.length > 0 ? transactions[0].balance : 0;

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      
      <header style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold', color: '#333' }}>
          SkyPay <span style={{ color: '#4caf50', fontWeight: 'normal' }}>Banking</span>
        </h1>
      </header>
      
      <section style={{ 
        backgroundColor: '#f9f9f9', 
        padding: '25px', 
        borderRadius: '12px', 
        marginBottom: '30px',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        border: '1px solid #ddd'
      }}>
        <div>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            style={{ padding: '10px', marginRight: '10px', borderRadius: '6px', border: '1px solid #ccc', width: '140px' }}
          />
          <button 
            onClick={() => onTransaction('deposit')} 
            style={{ padding: '10px 20px', backgroundColor: '#2ecc71', color: '#fff', marginRight: '8px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            Deposit
          </button>
          <button 
            onClick={() => onTransaction('withdraw')} 
            style={{ padding: '10px 20px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            Withdraw
          </button>
        </div>

        <div style={{ textAlign: 'right' }}>
          <small style={{ color: '#888', fontWeight: 'bold' }}>TOTAL BALANCE</small>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: currentBalance >= 0 ? '#2ecc71' : '#e74c3c' }}>
            ${currentBalance.toLocaleString()}
          </div>
        </div>
      </section>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #eee', color: '#666' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
            <th style={{ padding: '12px', textAlign: 'center' }}>Amount</th>
            <th style={{ padding: '12px', textAlign: 'right' }}>Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '15px' }}>
                {new Date(t.date).toLocaleDateString('en-GB')}
              </td>
              <td style={{ 
                padding: '15px', 
                textAlign: 'center', 
                color: t.amount > 0 ? '#2ecc71' : '#e74c3c', 
                fontWeight: 'bold' 
              }}>
                {t.amount > 0 ? `+${t.amount}` : t.amount}
              </td>
              <td style={{ padding: '15px', textAlign: 'right', fontWeight: 'bold' }}>
                ${t.balance.toLocaleString()}
              </td>
            </tr>
          ))}
          {transactions.length === 0 && (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                No transactions yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;