import { createContext, useContext, useState, ReactNode } from 'react';

interface AdminData {
  fullName: string;
  email: string;
}

interface AdminContextType {
  adminData: AdminData;
  updateAdminData: (data: Partial<AdminData>) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [adminData, setAdminData] = useState<AdminData>({
    fullName: 'Admin User',
    email: 'admin@smarttest.com',
  });

  const updateAdminData = (data: Partial<AdminData>) => {
    setAdminData(prev => ({ ...prev, ...data }));
  };

  return (
    <AdminContext.Provider value={{ adminData, updateAdminData }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
