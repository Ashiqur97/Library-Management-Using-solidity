import React from 'react'
import Home from './Home'
import Books from './Books'
import BorrowedBook from './BorrowedBook'
import Fine from './Fine'
import AdminPanel from './AdminPanel'

function Mainsection({currentSection}) {
  return (
    <div>
        {
            currentSection === 'home' && (
                <Home />
            )
        }
        {
            currentSection === 'books' && (
                <Books />
            )
        }
        {
            currentSection === 'borrowedBooks' && (
                <BorrowedBook />
            )
        }
        {
            currentSection === 'fine' && (
                <Fine />
            )
        }
        {
            currentSection === 'adminPanel' &&(
                <AdminPanel />
            )
        }
    </div>
  )
}

export default Mainsection