import { type ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-100 text-slate-800">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
