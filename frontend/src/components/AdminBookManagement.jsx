// import { ethers } from 'ethers';
import React, { useState } from 'react'

function AdminBookManagement({contract}) {
  const[bookData, setBookData] = useState({
    title: '',
    author:'',
    category: ''
  })

  const handleAddBook = async (e) => {
    e.preventDefault();
    const tx = contract.addBook(bookData.title, bookData.author, bookData.category);
    await contract.provider.waitForTransaction(tx.hash);
  }

  return (
    <div className='admin-bookmanagement'>
      <h2>Add New Book</h2>
      <form onSubmit={handleAddBook}>
        <input type='text' placeholder='Book Title' value={bookData.title} onChange={(e) => setBookData({...bookData, title: e.target.value})}/>
        <input type='text' placeholder='Book Author' value={bookData.author} onChange={(e) => setBookData({...bookData, author: e.target.value})} />
        <input type='text' placeholder='Book Category' value={bookData.category} onChange={(e) => setBookData({...bookData, category: e.target.value})} />
        <button type='submit'>Add Book</button>
      </form>
    </div>
  )
}

export default AdminBookManagement