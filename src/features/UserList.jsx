import React, { useState, useMemo } from 'react';
import { Search, Plus, AlertCircle, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import { getInitials } from '../utils/helpers';
import { cn } from '../utils/cn';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import UserDetails from './UserDetails';
import AddUserForm from './AddUserForm';

const UserList = () => {
  const { users, loading, error, addUser } = useUsers();
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter Logic
  // Derive a filtered list based on the current search query
  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  // Only take the slice of users that belongs to the current page
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddUser = (newUser) => {
    // Delegate to hook, then close the modal on success
    addUser(newUser);
    setIsAddModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center space-y-4 text-center">
        <div className="rounded-full bg-red-50 p-3">
            <AlertCircle className="h-6 w-6 text-red-600" />
        </div>
        <div>
            <h3 className="text-lg font-medium text-neutral-900">Unable to load clients</h3>
            <p className="text-neutral-500 max-w-sm mx-auto">{error}</p>
        </div>
        <Button onClick={() => window.location.reload()} variant="outline">Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
           <h1 className="text-2xl font-semibold text-neutral-900">Clients</h1>
           <p className="text-sm text-neutral-500">Manage your client base efficiently.</p>
        </div>
        <div className="flex items-center gap-3">
          <Input 
             icon={Search} 
             placeholder="Search clients..." 
             className="w-full sm:w-64"
             value={search}
             onChange={(e) => {
                 setSearch(e.target.value); 
                 setCurrentPage(1); // Reset to page 1 on search
             }}
          />
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus size={16} className="mr-2 shrink-0" />
            Add Client
          </Button>
        </div>
      </div>

      {/* Content */}
      {filteredUsers.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-neutral-50 p-4 mb-3">
                <Search className="h-6 w-6 text-neutral-400" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900">No clients found</h3>
            <p className="text-neutral-500">We couldn't find any clients matching "{search}"</p>
        </Card>
      ) : (
        <>
            {/* Desktop Table View - richer layout for larger screens */}
            <div className="hidden md:block overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-neutral-200">
                    <thead className="bg-neutral-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Company</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">Role</th>
                            <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-neutral-200">
                        {paginatedUsers.map((user) => (
                            <tr 
                              key={user.id} 
                              onClick={() => setSelectedUser(user)}
                              className="hover:bg-neutral-50 cursor-pointer transition-colors"
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0">
                                            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">
                                                {getInitials(user.name)}
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-neutral-900">{user.name}</div>
                                            <div className="text-sm text-neutral-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Badge variant={user.status === 'Active' ? 'success' : 'default'}>{user.status}</Badge>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                                    {user.company?.name || '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                                    {user.role || 'Member'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-neutral-400 hover:text-neutral-600">
                                        <MoreVertical className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card Grid View - simplified card layout for small screens */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {paginatedUsers.map((user) => (
                    <Card 
                        key={user.id} 
                        className="p-4 cursor-pointer hover:border-primary-300 transition-colors"
                        onClick={() => setSelectedUser(user)}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">
                                    {getInitials(user.name)}
                                </div>
                                <div>
                                    <h3 className="font-medium text-neutral-900">{user.name}</h3>
                                    <p className="text-sm text-neutral-500">{user.email}</p>
                                </div>
                            </div>
                            <Badge variant={user.status === 'Active' ? 'success' : 'default'}>{user.status}</Badge>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-sm text-neutral-500">
                             <span>{user.company?.name}</span>
                             <span>{user.role || 'Member'}</span>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-neutral-200 bg-white px-4 py-3 sm:px-6 rounded-b-xl md:rounded-t-none">
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-neutral-700">
                            Showing <span className="font-medium text-neutral-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-neutral-900">{Math.min(currentPage * itemsPerPage, filteredUsers.length)}</span> of <span className="font-medium text-neutral-900">{filteredUsers.length}</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-neutral-400 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={cn(
                                        "relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset focus:z-20 focus:outline-offset-0",
                                        currentPage === page 
                                            ? "z-10 bg-primary-600 text-white ring-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                                            : "text-neutral-900 ring-neutral-300 hover:bg-neutral-50"
                                    )}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-neutral-400 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRight className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </nav>
                    </div>
                </div>
                 {/* Mobile Pagination - compact version */}
                 <div className="flex items-center justify-between sm:hidden w-full">
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</Button>
                    <span className="text-sm text-neutral-700">Page {currentPage} of {totalPages}</span>
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</Button>
                 </div>
            </div>
        </>
      )}

      {/* Modals */}
      <Modal 
        isOpen={!!selectedUser} 
        onClose={() => setSelectedUser(null)} 
        title="Client Details"
        className="sm:max-w-2xl"
      >
        <UserDetails user={selectedUser} />
      </Modal>

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Add New Client"
        className="sm:max-w-md"
      >
        <AddUserForm onSubmit={handleAddUser} onCancel={() => setIsAddModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default UserList;
