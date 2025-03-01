import React from 'react'
import './componentStyle.css';

function BorrowedBook({contract}) {
  return (
    <div className='borrowed-container'>
        <h2>Your Borrowed Books</h2>

        <div className="borrowed-grid">
            <div className="borrowed-card">
                <h3>Book Title</h3>
                <p className='borrowed-author'>by [author name]</p>
                <p className='borrowed-duedate'>Due Date: {new Date().toLocaleDateString('en-GB')}</p>
                {/* <p className='borrowed-fineamount'>Fine: 10Tk</p> */}
                <p className='borrowed-nofine'>No fine</p>
                <button>Return Book</button>
            </div>
            <div className="borrowed-card">
                <h3>Book Title</h3>
                <p className='borrowed-author'>by [author name]</p>
                <p className='borrowed-duedate'>Due Date: {new Date().toLocaleDateString('en-GB')}</p>
                {/* <p className='borrowed-fineamount'>Fine: 10Tk</p> */}
                <p className='borrowed-nofine'>No fine</p>
                <button>Return Book</button>
            </div>
            <div className="borrowed-card">
                <h3>Book Title</h3>
                <p className='borrowed-author'>by [author name]</p>
                <p className='borrowed-duedate'>Due Date: {new Date().toLocaleDateString('en-GB')}</p>
                {/* <p className='borrowed-fineamount'>Fine: 10Tk</p> */}
                <p className='borrowed-nofine'>No fine</p>
                <button>Return Book</button>
            </div>
            <div className="borrowed-card">
                <h3>Book Title</h3>
                <p className='borrowed-author'>by [author name]</p>
                <p className='borrowed-duedate'>Due Date: {new Date().toLocaleDateString('en-GB')}</p>
                {/* <p className='borrowed-fineamount'>Fine: 10Tk</p> */}
                <p className='borrowed-nofine'>No fine</p>
                <button>Return Book</button>
            </div>
            <div className="borrowed-card">
                <h3>Book Title</h3>
                <p className='borrowed-author'>by [author name]</p>
                <p className='borrowed-duedate'>Due Date: {new Date().toLocaleDateString('en-GB')}</p>
                {/* <p className='borrowed-fineamount'>Fine: 10Tk</p> */}
                <p className='borrowed-nofine'>No fine</p>
                <button>Return Book</button>
            </div>
            <div className="borrowed-card">
                <h3>Book Title</h3>
                <p className='borrowed-author'>by [author name]</p>
                <p className='borrowed-duedate'>Due Date: {new Date().toLocaleDateString('en-GB')}</p>
                {/* <p className='borrowed-fineamount'>Fine: 10Tk</p> */}
                <p className='borrowed-nofine'>No fine</p>
                <button>Return Book</button>
            </div>
            <div className="borrowed-card">
                <h3>Book Title</h3>
                <p className='borrowed-author'>by [author name]</p>
                <p className='borrowed-duedate'>Due Date: {new Date().toLocaleDateString('en-GB')}</p>
                {/* <p className='borrowed-fineamount'>Fine: 10Tk</p> */}
                <p className='borrowed-nofine'>No fine</p>
                <button>Return Book</button>
            </div>
            <div className="borrowed-card">
                <h3>Book Title</h3>
                <p className='borrowed-author'>by [author name]</p>
                <p className='borrowed-duedate'>Due Date: {new Date().toLocaleDateString('en-GB')}</p>
                {/* <p className='borrowed-fineamount'>Fine: 10Tk</p> */}
                <p className='borrowed-nofine'>No fine</p>
                <button>Return Book</button>
            </div>
        </div>
    </div>
  )
}

export default BorrowedBook