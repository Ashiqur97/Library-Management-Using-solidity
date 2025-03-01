import React, { act, useState } from 'react'
import AdminDashboard from './AdminDashboard'
import AdminBookManagement from './AdminBookManagement';
import AdminUserManagement from './AdminUserManagement';

function AdminPanel({contract}) {
    const [activeSection, setActiveSection] = useState('dashboard');
  return (
    <div className='admin-container'>
        
        <div className="admin-mainsection">
            <div className="admin-sidebar">
                <ul>
                    <li onClick={() => setActiveSection('dashboard')}>Dashboard</li>
                    <li onClick={() => setActiveSection('bookmanagement')}>Books Management</li>
                    <li onClick={() => setActiveSection('usermanagement')}>User Management</li>
                </ul>
            </div>
            <div className="admin-content">
                {
                    activeSection === 'dashboard' && (
                        <AdminDashboard contract={contract} />
                    )
                }
                {
                    activeSection === 'bookmanagement' && (
                        <AdminBookManagement contract={contract} />
                    )
                }
                {
                    activeSection === 'usermanagement' && (
                        <AdminUserManagement contract={contract} />
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default AdminPanel