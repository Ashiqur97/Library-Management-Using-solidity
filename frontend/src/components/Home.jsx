import React, { useEffect, useState } from 'react'
import './componentStyle.css';

function Home({contract, address}) {
  const[isRegister, setIsRegister] = useState(false);
  const[name, setName] = useState();
  const [currentUser, setCurrentUser] = useState();

  const handleRegisterNow = (e) => {
    e.preventDefault();
    setIsRegister(true);
  }
  const handleCompleteRegister = async (e) => {
    e.preventDefault();
    const tx = await contract.registerUser(name);
    // await contract.provider.waitForTransaction(tx.hash);
    setName('');
    setIsRegister(false);

  }
  const fetchUser = async() => {
    if(contract && address) {
      const tx = await contract.users(address);
      setCurrentUser(tx);
      console.log(currentUser);
    }
  }
  useEffect(() => {
    fetchUser();
  },[contract, address]);


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

            {
              (currentUser && currentUser.name) ? <p>You are a registered user!</p> : isRegister ? <div><input type="text" placeholder='Your Name' onChange={(e) => setName(e.target.value)} />
            <button onClick={handleCompleteRegister}>Complete Register</button></div> : <button onClick={handleRegisterNow}>Register Now</button>
            }
            
        </div>

    </div>
  )
}

export default Home