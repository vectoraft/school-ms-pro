import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PayrollDashboard({ staffId }) {
  const [payroll, setPayroll] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/wp-json/schoolms/v1/payroll/list', { params: { staff_id: staffId } })
      .then(res => setPayroll(res.data)).finally(() => setLoading(false));
  }, [staffId]);

  return (
    <div className="dashboard-widget payroll-dashboard">
      <h3>Payroll</h3>
      {loading && <div>Loading...</div>}
      {!loading && (
        <table className="table table-sm">
          <thead><tr><th>Amount</th><th>Paid At</th><th>Notes</th></tr></thead>
          <tbody>
            {payroll.map((row, i) => (
              <tr key={i}><td>{row.amount}</td><td>{row.paid_at}</td><td>{row.notes}</td></tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
