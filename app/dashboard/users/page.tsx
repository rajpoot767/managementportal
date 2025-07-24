import React from 'react'
import UserManagement from '@/core/widgets/users/UserManagement'
import UserService from '@/core/clients/UserService'
import { UserApiResponse } from '@/core/clients/UserModel'

export default async function Page() {
  const userService = new UserService()
  const userResponse = await userService.getAllUsers()

  return (
    <UserManagement userResponse={userResponse as UserApiResponse} />
  )
} 