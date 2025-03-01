import React from 'react'

function AdminDashboard({contract}) {
  return (
    <div className='admin-dashboard'>
      <h2>Admin Dashboard</h2>
      <div className="admin-dashboardmain">
        <div>
          <h4>Total Books</h4>
          <p>220</p>
        </div>
        <div>
          <h4>Total Users</h4>
          <p>20</p>
        </div>
        <div>
          <h4>Books Currently Borrowed</h4>
          <p>10</p>
        </div>
        <div>
          <h4>Overdue Books</h4>
          <p>20</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard