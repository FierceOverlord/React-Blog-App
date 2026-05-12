import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input, Select } from '../components/Index'
import { fetchAllUsers, fetchPendingUsers, approveUserAction, clearMessage } from '../store/adminSlice'

function AdminDashboardComponent() {
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")


  const { pendingRequests, loading, error, successMessage, allusers } = useSelector(state => state.admin)

  const approveUser = (id) => {
    console.log("User approved")
    dispatch(approveUserAction(id));
  }

  useEffect(() => {
    dispatch(fetchPendingUsers());

    if(statusFilter === "All") {
      dispatch(fetchAllUsers())
    }
    
  }, [roleFilter, statusFilter, dispatch])

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage])

  const filteredRequests = pendingRequests.filter(user => {
    const matchSearch = user.email.toLowerCase().includes(searchQuery.toLowerCase())

    const status = statusFilter === "All" || user.status === statusFilter

    /* const roleSearch = () => {
      if (roleFilter === "User") {
        return user.role === roleFilter.toLowerCase()
      }

      if (roleFilter === "Admin") {
        return user.role === roleFilter.toLowerCase()
      }
    }

    const filterSearch = () => {
      if (statusFilter === "All") {
        return dispatch(fetchAllUsers())
      }

      if (statusFilter === "Pending") {
        return dispatch(fetchPendingUsers());
      }
      if (statusFilter === "Fulfilled") {
        return dispatch(fetchPendingUsers.fulfilled)
      }
      if (statusFilter === "Rejected") {
        return dispatch(fetchPendingUsers.rejected)
      }
    } */

    return matchSearch && status;
  }
  )

  return (
    <div className='w-full mx-auto p-5'>
      <div className='flex flex-col justify-center items-center w-full px-3 py-2 rounded-xl border bg-white border-gray-500'>
        <h1 className='mb-3 mt-2 text-xl'>Admin Dashboard</h1>

        {loading && <p className='text-gray-900 mb-2'>Loading...</p>}
        {error && <p className='text-red-600 mb-2'>Error: {error}</p>}
        {successMessage && <p className='text-green-600 mb-2 '>Success: {successMessage}</p>}

        <div className='flex w-full gap-1'>
          <Input
            placeholder="Search User"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={'px-2 py-1'}
          />

          <div className='flex gap-2'>
            <Select
              label="Role"
              options={["User", "Admin"]}
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className={'px-2 py-1 w-max'}
            />

            <Select
              label="Status"
              options={["All", "Pending", "Fulfilled", "Rejected"]}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={'px-2 py-1 w-max'}
            />
          </div>
        </div>

        <div className='mt-3 bg-white border rounded-xl w-full'>
          <ul className='w-full p-3'>
            {filteredRequests.length === 0 ? (
              <p>No users found</p>
            ) : (filteredRequests.map(user => (
              <div key={user.$id} className='flex items-center mb-2 justify-between border border-gray-200 rounded-xl px-2 py-1'>
                <li key={user.$id}>
                  {user.email}
                </li>

                <div className='space-x-3'>
                  <Button text="Approve" bgColor='bg-green-500' onClick={() => approveUser(user.$id)} />
                  <Button text="Reject" bgColor='bg-red-600' />
                </div>
              </div>
            )))
            }
          </ul>
        </div>

      </div>
    </div>
  )
}

export default AdminDashboardComponent