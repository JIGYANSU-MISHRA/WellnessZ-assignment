import React from 'react';
import { LayoutDashboard, Bell } from 'lucide-react';
import UserList from './features/UserList';

function App() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
      {/* Simple top navbar with branding and quick actions */}
      <header className="sticky top-0 z-30 w-full border-b border-neutral-200 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-neutral-900">WellnessZ Client Dashboard</span>
          </div>
          
          <div className="flex items-center gap-4">
             <button className="relative rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-500 transition-colors">
                 <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
                 <Bell className="h-5 w-5" />
             </button>
             <div className="h-8 w-8 overflow-hidden rounded-full bg-neutral-200 ring-2 ring-white cursor-pointer hover:ring-neutral-200 transition-all">
                <div className="flex h-full w-full items-center justify-center bg-primary-100 text-primary-700 font-medium text-xs">
                    JM
                </div>
             </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <UserList />
        </div>
      </main>
    </div>
  );
}

export default App;
