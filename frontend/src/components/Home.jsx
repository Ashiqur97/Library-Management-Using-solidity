import React from 'react'
import './componentStyle.css';

function Home() {
  return (
    <div className='home-container'>
        <h2>Welcome to the Library Management System!</h2>
        <p>Explore a wide variety of books, borrow your favorites, and manage your fines.
        Join our community and start managing your library experience today.</p>

        <div className="howItWorks">
            <h3>How It Works?</h3>
            <p>
            1. Browse through our collection of books.
            <br />
            2. Register to borrow books or reserve them.
            <br />
            3. Track due dates and pay fines online.
            </p>

            <button>Register Now</button>
        </div>

    </div>
  )
}

export default Home