import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { login as authLogin } from '../store/authSlice'
import { Button, Input } from "./Index"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { getPasswordPolicyDescription, validatePasswordPolicy } from "../utils/PasswordPolicy"

function ChangePasswordComponent() {
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submit = async (data) => {
    setError("")
    setSuccess("")

    if (data.newPassword !== data.confirmPassword) {
      setError("New password should match confirm password")
      return
    }

    const validation = validatePasswordPolicy(data.newPassword)

    if (!validation.isValid) {
      setError(validation.errors[0])
      return
    }

    try {

      const updateUser = await authService.changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.confirmPassword
      })

      dispatch(authLogin(updateUser))
      setSuccess("Password updated successfully")
      setTimeout(() => navigate("/"), 800)

    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className='flex items-center justify-center w-full' >

      <div className='mx-auto w-full max-w-lg rounded-xl p-10 bg-gray-100 border border-black/2'>

        <h3 className='text-center text-2xl font-bold leading-tight'>Change your password</h3>
        <p className='mt-3 text-sm text-black/70' >{getPasswordPolicyDescription()}</p>
        
        {error && <p className='text-red-600 text-center'>{error}</p>}
        {success && <p className='text-green-600 text-center'>{success}</p>}

        <form onSubmit={handleSubmit(submit)}>
          <Input
            label="Old Password"
            type="password"
            {...register("oldPassword", { required: true })}
          />

          <Input
            label="New Password"
            type="password"
            {...register("newPassword", { required: true })}
          />

          <Input
            label="Confirm New Password"
            type="password"
            {...register("confirmPassword", { required: true })}
          />

          <Button
            type='submit'
            className='w-full'
            text={"Update Password"}
          />
        </form>
      </div>
    </div>
  )
}

export default ChangePasswordComponent