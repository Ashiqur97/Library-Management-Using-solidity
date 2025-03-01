import React from 'react'

function Navigation({setCurrentSection}) {
  return (
    <nav>
        <ul>
            <li onClick={() => setCurrentSection('home')}>Home</li>
            <li onClick={() => setCurrentSection('books')}>Books</li>
            <li onClick={() => setCurrentSection('borrowedBooks')}>Borrowed Book</li>
            <li onClick={() => setCurrentSection('fine')}>Fine</li>
            <li onClick={() => setCurrentSection('adminPanel')}>Admin Panel</li>
        </ul>
    </nav>
  )
}

export default Navigation