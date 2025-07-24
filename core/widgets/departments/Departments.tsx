"use client";

import React, { useState, useMemo } from 'react';
import { DepartmentApiResponse, Department } from '@/core/clients/DepartmentModel';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/core/components/ui/table';
import DepartmentModal from './DepartmentModal';
import Button from '@/core/components/Button';
import { ButtonTypes } from '@/core/components/ButtonTypes';
import ToastService from '@/core/components/ToastService';
import Pagination from '@/core/components/Pagination';
import DepartmentService from '@/core/clients/DepartmentService';
import Scroller from '@/core/components/ui/scroller';
import { SearchBar } from '@/core/components/ui/search-bar';

interface DepartmentProps {
  departmentResponse: DepartmentApiResponse
}

type SortConfig = {
  key: keyof Department;
  direction: 'asc' | 'desc';
} | null;

const Departments: React.FC<DepartmentProps> = ({departmentResponse}) => {
  const [departments, setDepartments] = useState<Department[]>(departmentResponse?.result || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [filterText, setFilterText] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const departmentService = new DepartmentService();

  const handleAddDepartment = () => {
    setSelectedDepartment(null);
    setIsModalOpen(true);
  };

  const handleEditDepartment = async (department: Department) => {
    try {
      setIsLoading(true);
      const response = await departmentService.getDepartmentById(department.id);
      // @ts-ignore - temporarily ignore isSuccessful check
      if (response?.isSuccessful) {
        setSelectedDepartment(response.result[0]);
        setIsModalOpen(true);
      } else {
        ToastService.showError(response.message || 'Failed to fetch department details');
      }
    } catch (error) {
      ToastService.showError('Failed to fetch department details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDepartment = async (department: Partial<Department>) => {
    try {
      setIsLoading(true);
      let response;

      if (selectedDepartment) {
        response = await departmentService.updateDepartment(selectedDepartment.id, department);
      } else {
        response = await departmentService.createDepartment(department);
      }

      // @ts-ignore - temporarily ignore isSuccessful check
      if (response?.isSuccessful) {
        ToastService.showInfo(response.message || 'Department saved successfully');
        // Refresh the departments list
        const updatedList = await departmentService.getAllDepartments();
        // @ts-ignore - temporarily ignore isSuccessful check
        if (updatedList?.isSuccessful) {
          setDepartments(updatedList.result);
        }
        setIsModalOpen(false);
        return { isSuccessful: true, message: response.message };
      } else {
        ToastService.showError(response.message || 'Failed to save department');
        return { isSuccessful: false, message: response.message };
      }
    } catch (error) {
      ToastService.showError('Failed to save department');
      return { isSuccessful: false, message: 'Failed to save department' };
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDepartmentStatus = async (department: Department) => {
    try {
      setIsLoading(true);
      const response = await departmentService.toggleDepartmentStatus(department.id);
      
      // @ts-ignore - temporarily ignore isSuccessful check
      if (response?.isSuccessful) {
        ToastService.showInfo(response.message || `Department ${department.isActive ? 'deactivated' : 'activated'} successfully`);
        // Refresh the departments list
        const updatedList = await departmentService.getAllDepartments();
        // @ts-ignore - temporarily ignore isSuccessful check
        if (updatedList?.isSuccessful) {
          setDepartments(updatedList.result);
        }
        return { isSuccessful: true, message: response.message };
      } else {
        ToastService.showError(response.message || 'Failed to update department status');
        return { isSuccessful: false, message: response.message };
      }
    } catch (error) {
      ToastService.showError('Failed to update department status');
      return { isSuccessful: false, message: 'Failed to update department status' };
    } finally {
      setIsLoading(false);
    }
  };

  const handleSort = (key: keyof Department) => {
    setSortConfig(current => {
      if (current?.key === key) {
        if (current.direction === 'asc') {
          return { key, direction: 'desc' };
        }
        return null;
      }
      return { key, direction: 'asc' };
    });
  };

  const getSortIcon = (key: keyof Department) => {
    if (sortConfig?.key !== key) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" />
        </svg>
      );
    }
    
    return sortConfig.direction === 'asc' ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    );
  };

  const filteredAndSortedDepartments = useMemo(() => {
    if (!departments) return [];

    let filtered = [...departments];

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(dept => 
        statusFilter === 'active' ? dept.isActive : !dept.isActive
      );
    }

    // Apply text filter
    if (filterText) {
      const searchText = filterText.toLowerCase();
      filtered = filtered.filter(dept =>
        dept.departmentName.toLowerCase().includes(searchText) ||
        dept.description?.toLowerCase().includes(searchText) ||
        dept.departmentCode.toLowerCase().includes(searchText)
      );
    }

    // Apply sorting
    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === null) return 1;
        if (bValue === null) return -1;
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return sortConfig.direction === 'asc'
          ? (aValue < bValue ? -1 : 1)
          : (bValue < aValue ? -1 : 1);
      });
    }

    return filtered;
  }, [departments, sortConfig, filterText, statusFilter]);

  const paginatedDepartments = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredAndSortedDepartments.slice(startIndex, startIndex + pageSize);
  }, [filteredAndSortedDepartments, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredAndSortedDepartments.length / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const stats = useMemo(() => {
    const total = filteredAndSortedDepartments.length;
    const active = filteredAndSortedDepartments.filter(d => d.isActive).length;
    const totalStaff = filteredAndSortedDepartments.reduce((sum, dept) => sum + (dept.numberOfStaff || 0), 0);
    const totalBudget = filteredAndSortedDepartments.reduce((sum, dept) => sum + (dept.departmentBudget || 0), 0);

    return { total, active, totalStaff, totalBudget };
  }, [filteredAndSortedDepartments]);

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      <div className="p-4 space-y-4 flex-1 overflow-hidden">
        <div className="flex justify-between items-center animate-fade-in">
          <h1 className="text-lg font-semibold text-gray-900">Departments</h1>
          <Button
            onClick={async () => {
              handleAddDepartment();
              return { isSuccessful: true, message: '' };
            }}
            ButtonType={ButtonTypes.Primary}
            showToast={false}
            className="flex items-center gap-1 text-sm py-1.5 animate-scale-in"
          >
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
            </svg>
            Add Department
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 flex items-center justify-between animate-slide-from-left" style={{ animationDelay: '0ms' }}>
            <div>
              <p className="text-xs text-gray-500">Total Departments</p>
              <p className="text-lg font-semibold mt-0.5">{stats.total}</p>
            </div>
            <div className="p-2 bg-blue-50 rounded-full">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 flex items-center justify-between animate-slide-from-left" style={{ animationDelay: '100ms' }}>
            <div>
              <p className="text-xs text-gray-500">Active Departments</p>
              <p className="text-lg font-semibold mt-0.5">{stats.active}</p>
            </div>
            <div className="p-2 bg-green-50 rounded-full">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 flex items-center justify-between animate-slide-from-left" style={{ animationDelay: '200ms' }}>
            <div>
              <p className="text-xs text-gray-500">Total Staff</p>
              <p className="text-lg font-semibold mt-0.5">{stats.totalStaff}</p>
            </div>
            <div className="p-2 bg-purple-50 rounded-full">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 flex items-center justify-between animate-slide-from-left" style={{ animationDelay: '300ms' }}>
            <div>
              <p className="text-xs text-gray-500">Total Budget</p>
              <p className="text-lg font-semibold mt-0.5">${stats.totalBudget.toLocaleString()}</p>
            </div>
            <div className="p-2 bg-yellow-50 rounded-full">
              <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 animate-slide-from-right">
          <div className="flex-1">
            <SearchBar
              placeholder="Search departments..."
              value={filterText}
              onSearch={setFilterText}
              variant="expanded"
              size="full"
              className="animate-fade-in"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
                statusFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
                statusFilter === 'active'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setStatusFilter('inactive')}
              className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
                statusFilter === 'inactive'
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Inactive
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="flex-1 bg-white rounded-lg shadow overflow-hidden flex flex-col animate-slide-from-bottom">
          <Scroller direction="both" className="flex-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="py-3 px-3 text-xs font-medium text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => handleSort('departmentName')}
                  >
                    <div className="flex items-center gap-1">
                      Department Name
                      {getSortIcon('departmentName')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="py-3 px-3 text-xs font-medium text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => handleSort('headDoctorId')}
                  >
                    <div className="flex items-center gap-1">
                      Department Head
                      {getSortIcon('headDoctorId')}
                    </div>
                  </TableHead>
                  <TableHead className="py-3 px-3 text-xs font-medium text-gray-900">Description</TableHead>
                  <TableHead 
                    className="py-3 px-3 text-xs font-medium text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => handleSort('numberOfStaff')}
                  >
                    <div className="flex items-center gap-1">
                      Staff
                      {getSortIcon('numberOfStaff')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="py-3 px-3 text-xs font-medium text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => handleSort('numberOfBeds')}
                  >
                    <div className="flex items-center gap-1">
                      Beds
                      {getSortIcon('numberOfBeds')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="py-3 px-3 text-xs font-medium text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => handleSort('departmentBudget')}
                  >
                    <div className="flex items-center gap-1">
                      Budget
                      {getSortIcon('departmentBudget')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="py-3 px-3 text-xs font-medium text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => handleSort('isActive')}
                  >
                    <div className="flex items-center gap-1">
                      Status
                      {getSortIcon('isActive')}
                    </div>
                  </TableHead>
                  <TableHead className="py-3 px-3 text-xs font-medium text-gray-900">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="py-6">
                      <div className="flex justify-center">
                        <svg className="animate-spin h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : paginatedDepartments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="py-6 text-center text-gray-500 text-sm">
                      No departments found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedDepartments.map((department, index) => (
                    <TableRow key={department.id} className={`hover:bg-gray-50 text-sm animate-fade-in`} style={{ animationDelay: `${index * 50}ms` }}>
                      <TableCell className="py-2.5 px-3">{department.departmentName}</TableCell>
                      <TableCell className="py-2.5 px-3">{department.headDoctorId || 'Not Assigned'}</TableCell>
                      <TableCell className="py-2.5 px-3">
                        <div className="max-w-xs truncate" title={department.description}>
                          {department.description}
                        </div>
                      </TableCell>
                      <TableCell className="py-2.5 px-3">{department.numberOfStaff || 0}</TableCell>
                      <TableCell className="py-2.5 px-3">{department.numberOfBeds || 0}</TableCell>
                      <TableCell className="py-2.5 px-3">${department.departmentBudget?.toLocaleString() || '0'}</TableCell>
                      <TableCell className="py-2.5 px-3">
                        <button
                          onClick={() => toggleDepartmentStatus(department)}
                          className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            department.isActive ? 'bg-green-500' : 'bg-gray-200'
                          }`}
                          role="switch"
                          aria-checked={department.isActive}
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              department.isActive ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </TableCell>
                      <TableCell className="py-2.5 px-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditDepartment(department)}
                            className="text-sm text-gray-700 hover:text-blue-600 transition-colors duration-200"
                          >
                            Details
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Scroller>

          {filteredAndSortedDepartments.length > 0 && (
            <div className="border-t border-gray-200 mt-auto">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={filteredAndSortedDepartments.length}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            </div>
          )}
        </div>
      </div>

      <DepartmentModal
        department={selectedDepartment}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveDepartment}
      />
    </div>
  );
};

export default Departments;