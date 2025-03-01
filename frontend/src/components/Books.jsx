import React, { useEffect, useState } from 'react'

function Books({contract}) {
    const [books, setBooks] = useState([]);

    const fetchBook = async () => {
        const tx = await contract.getBooks(1,10);
        console.log(tx);
        setBooks(tx);
    }
    useEffect(() => {
        fetchBook();
    },[]);
  return (
    <div className='books-container'>
        <div className="searchbar">
            <input type="text" placeholder='Search books...' />
        </div>
        <div className="books-grid">
            {books.map(book =>(
                <div key={book.id.toString()} className="book-card">
                    <h3>{book.title}</h3>
                    <p>by {book.author}</p>
                    <p className='book-category'>Category: {book.category}</p>
                    {book.isAvailable ? <p className="book-available">Available</p> : <p>Not Available</p>}
                    <button>Borrow</button>
                </div>
            ))}
            
          
        </div>
       {books.length <=12 ? '' :  <div className="books-pagination">
            <button className='books-pagination-btn'>Previous</button>
            <span className="books-pagination-txt">
                Pages 2 of 10
            </span>
            <button className='books-pagination-btn'>Next</button>
        </div>}
    </div>
  )
}

export default Books