import React, { useEffect, useState } from 'react'

function AdminUserManagement({contract}) {
  // const [newUser, setNewUser] = useState({
  //   reqId: '',
  //   user: ''
  // });

  const [reqUser, setReqUser] = useState();
  const [requestId, setRequestId] = useState();

  // const handleNewUserRequested = (requestId, user) => {
  //   setNewUser({
  //     reqId: requestId,
  //     user: user,
  //   });
  // }

  useEffect(() => {
    if(contract) {
      // contract.on('NewUserRequested', handleNewUserRequested);

      // return () => {
      //   contract.off('NewUserRequested', handleNewUserRequested);
      // }

      fetchRequestUser();
    }
    
  },[]);

  const fetchRequestUser = async () => {
    const reqId = await contract.requestId();
    setRequestId(reqId.toNumber());
    const tx = await contract.requestRegister(reqId.toNumber());
    setReqUser(tx);
  }


  const handleApprove = async(e) => {
    e.preventDefault();
    const tx = contract.approveUser(requestId);
    await contract.provider.waitForTransaction(tx.hash);
    alert(`${newUser.user} is approved!`);
  }

  return (
    <div className='admin-usermanagement'>
      <div className="admin-userlist">
        <h2>Pending Users</h2>
        <ul>
          <li>
            <span>User Name</span>
            <span>User Address</span>
            <span>Action</span>
          </li>
          {(reqUser && reqUser.name) && (<li>
            <span>{reqUser.name}</span>
            <span>{reqUser.userAddress}</span>
            <button onClick={handleApprove}>Approve</button>
          </li>)}
        </ul>
      </div>
    </div>
  )
}

export default AdminUserManagement