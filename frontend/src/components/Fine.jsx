import React from 'react'

function Fine() {
  return (
    <div className='fine-container'>
        <h2>Your Fine Details</h2>
        {/* <div className="fine-fineamountcontainer">
            <p className="fine-finedetails">Total Fine: 200Tk</p>
            <button>Pay Fine</button>
        </div> */}

        {/* <p className="fine-paymentstatus">Payment Successful</p> */}
        <p className="fine-nofine">You have no outstanding fines.</p>
    </div>
  )
}

export default Fine