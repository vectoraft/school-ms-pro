import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function FeeManagementDashboard({ classId, studentId }) {
  const [fees, setFees] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get('/wp-json/schoolms/v1/fees/list', { params: { class_id: classId } }),
      axios.get('/wp-json/schoolms/v1/fees/payments', { params: { student_id: studentId } })
    ]).then(([feesRes, payRes]) => {
      setFees(feesRes.data);
      setPayments(payRes.data);
    }).finally(() => setLoading(false));
  }, [classId, studentId]);

  return (
    <div className="dashboard-widget fee-management-dashboard">
      <h3>Fee Management</h3>
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
          <h4>Fees</h4>
          <table className="table table-sm">
            <thead><tr><th>Title</th><th>Amount</th><th>Due Date</th></tr></thead>
            <tbody>
              {fees.map((fee, i) => (
                <tr key={i}><td>{fee.title}</td><td>{fee.amount}</td><td>{fee.due_date}</td></tr>
              ))}
            </tbody>
          </table>
          <h4>Payments</h4>
          <table className="table table-sm">
            <thead><tr><th>Fee ID</th><th>Amount</th><th>Paid At</th></tr></thead>
            <tbody>
              {payments.map((pay, i) => (
                <tr key={i}><td>{pay.fee_id}</td><td>{pay.amount}</td><td>{pay.paid_at}</td></tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
