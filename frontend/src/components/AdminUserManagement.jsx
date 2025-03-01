import React from 'react'

function AdminUserManagement() {
  return (
    <div className='admin-usermanagement'>
      {/* <h2>User Management</h2>
      <div className="admin-userlist">
        <ul>
          <li>
            <span>User Name</span>
            <span>User Address</span>
            <span>Book Borrowed</span>
            <span>Fine</span>
          </li>
          <li>
            <span>User Name</span>
            <span>User Address</span>
            <span>Book Borrowed</span>
            <span>Fine</span>
          </li>
        </ul>
      </div> */}
      <div className="admin-userlist">
        <h2>Pending Users</h2>
        <ul>
          <li>
            <span>User Name</span>
            <span>User Address</span>
            <span>Action</span>
          </li>
          <li>
            <span>User Name</span>
            <span>User Address</span>
            <button>Approve</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AdminUserManagement