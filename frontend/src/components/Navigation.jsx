import React, { useEffect, useState } from 'react'

function Navigation({setCurrentSection, contract, address}) {
  const [admin, setAdmin] = useState();

  const fetchAdmin = async () => {
    const tx = await contract.admin();
    setAdmin(tx);
  }


  useEffect(() => {
    fetchAdmin()
  },[]);
  
  return (
    <nav>
        <ul>
            <li onClick={() => setCurrentSection('home')}>Home</li>
            <li onClick={() => setCurrentSection('books')}>Books</li>
            <li onClick={() => setCurrentSection('borrowedBooks')}>Borrowed Book</li>
            <li onClick={() => setCurrentSection('fine')}>Fine</li>
            {
              admin.toLowerCase() === address.toLowerCase() ? <li onClick={() => setCurrentSection('adminPanel')}>Admin Panel</li> : ''
            }
        </ul>
    </nav>
  )
}

export default Navigation