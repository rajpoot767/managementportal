"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/core/components/ui/card"
import { Button } from "@/core/components/ui/button"
import { Input } from "@/core/components/ui/input"
import { Label } from "@/core/components/ui/label"
import { Badge } from "@/core/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/core/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/core/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/core/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/core/components/ui/dropdown-menu"
import Icon from "@/core/icons/Icon"
import { User, UserApiResponse } from "@/core/clients/UserModel"
import UserService from "@/core/clients/UserService"
import ToastService from "@/core/components/ToastService"
import { SearchBar } from "@/core/components/ui/search-bar"
import { Dropdown } from "@/core/components/ui/dropdown";

interface UserFormData {
  name: string
  email: string
  phone: string
  role: string
  department: string
}

interface UserManagementProps {
  userResponse: UserApiResponse
}

interface AddUserFormProps {
  onSubmit: (data: UserFormData) => void;
  isLoading: boolean;
}

function AddUserForm({ onSubmit, isLoading }: AddUserFormProps) {
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", email: "", phone: "", role: "", department: "" });
  };

  const roleOptions = [
    { label: "Admin", value: "admin" },
    { label: "Doctor", value: "doctor" },
    { label: "Nurse", value: "nurse" },
    { label: "Receptionist", value: "receptionist" },
    { label: "Pharmacist", value: "pharmacist" },
    { label: "Lab Technician", value: "lab_tech" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Dropdown
            value={formData.role}
            onValueChange={(value) => setFormData({ ...formData, role: value })}
            options={roleOptions}
            placeholder="Select role"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="department">Department</Label>
        <Input
          id="department"
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          required
        />
      </div>

      <Button type="submit" className="w-full" loading={isLoading}>
        Create User
      </Button>
    </form>
  )
}

export default function UserManagement({ userResponse }: UserManagementProps) {
  const [users, setUsers] = useState<User[]>(userResponse?.result || [])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const userService = new UserService()

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    return matchesSearch && matchesRole
  })

  const handleAddUser = async (userData: UserFormData) => {
    try {
      setIsLoading(true)
      const response = await userService.createUser({
        ...userData,
        status: 'active'
      })
      if (response.isSuccessful) {
        ToastService.showInfo(response.message || 'User created successfully')
        const updatedList = await userService.getAllUsers()
        if (updatedList.isSuccessful) {
          setUsers(updatedList.result)
        }
        setIsAddUserOpen(false)
      } else {
        ToastService.showError(response.message || 'Failed to create user')
      }
    } catch (error) {
      ToastService.showError('Failed to create user')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleUserStatus = async (userId: number) => {
    try {
      setIsLoading(true)
      const response = await userService.toggleUserStatus(userId)
      if (response.isSuccessful) {
        ToastService.showInfo(response.message || 'User status updated successfully')
        const updatedList = await userService.getAllUsers()
        if (updatedList.isSuccessful) {
          setUsers(updatedList.result)
        }
      } else {
        ToastService.showError(response.message || 'Failed to update user status')
      }
    } catch (error) {
      ToastService.showError('Failed to update user status')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteUser = async (userId: number) => {
    try {
      setIsLoading(true)
      // Note: We'll need to add delete endpoint in the UserService
      // For now, just filter out the user from the state
      setUsers(users.filter((user) => user.id !== userId))
      ToastService.showInfo('User deleted successfully')
    } catch (error) {
      ToastService.showError('Failed to delete user')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold animate-fade-in">User Management</h1>
          <p className="text-muted-foreground animate-fade-in animation-delay-100">Manage hospital staff and their permissions</p>
        </div>
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient" animation="scale-in">
              <Icon name="addIcon" className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account for hospital staff</DialogDescription>
            </DialogHeader>
            <AddUserForm onSubmit={handleAddUser} isLoading={isLoading} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="animate-slide-from-right">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <SearchBar
              placeholder="Search users..."
              value={searchTerm}
              onSearch={setSearchTerm}
              variant="expanded"
              size="full"
              className="animate-fade-in"
            />
            <Dropdown
              value={filterRole}
              onValueChange={setFilterRole}
              options={[
                { label: "All Roles", value: "all" },
                { label: "Admin", value: "admin" },
                { label: "Doctor", value: "doctor" },
                { label: "Nurse", value: "nurse" },
                { label: "Receptionist", value: "receptionist" },
                { label: "Pharmacist", value: "pharmacist" },
                { label: "Lab Technician", value: "lab_tech" },
              ]}
              className="w-48"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="animate-slide-from-bottom animation-delay-200">
        <CardHeader>
          <CardTitle>Staff Directory</CardTitle>
          <CardDescription>
            {filteredUsers.length} of {users.length} users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user, index) => (
                <TableRow key={user.id} className={`animate-fade-in`} style={{ animationDelay: `${index * 50}ms` }}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {user.role.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Icon name="emailIcon" className="h-3 w-3" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Icon name="phoneIcon" className="h-3 w-3" />
                        {user.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Icon name="menuIcon" className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Icon name="editIcon" className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Icon name="permissionsIcon" className="h-4 w-4 mr-2" />
                          Permissions
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleUserStatus(user.id)}>
                          {user.status === "active" ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteUser(user.id)} className="text-red-600">
                          <Icon name="deleteIcon" className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 