import React from 'react'
import Home from './Home'
import Books from './Books'
import BorrowedBook from './BorrowedBook'
import Fine from './Fine'
import AdminPanel from './AdminPanel'

function Mainsection({currentSection, contract}) {
  return (
    <div>
        {
            currentSection === 'home' && (
                <Home contract={contract} />
            )
        }
        {
            currentSection === 'books' && (
                <Books contract={contract} />
            )
        }
        {
            currentSection === 'borrowedBooks' && (
                <BorrowedBook contract={contract} />
            )
        }
        {
            currentSection === 'fine' && (
                <Fine contract={contract} />
            )
        }
        {
            currentSection === 'adminPanel' &&(
                <AdminPanel contract={contract} />
            )
        }
    </div>
  )
}

export default Mainsection