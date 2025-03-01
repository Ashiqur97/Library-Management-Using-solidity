import React from 'react'

function AdminBookManagement() {
  return (
    <div className='admin-bookmanagement'>
      <h2>Add New Book</h2>
      <form>
        <input type='text' placeholder='Book Title' />
        <input type='text' placeholder='Book Author' />
        <input type='text' placeholder='Book Category' />
        <button>Add Book</button>
      </form>
    </div>
  )
}

export default AdminBookManagement