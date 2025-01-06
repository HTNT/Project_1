import React, { createContext, useContext, useState } from 'react';
import UserProfile from '../../pages/profile/user-profile';
// Tạo Context
const DataContext = createContext();

// Cung cấp dữ liệu toàn bộ ứng dụng
export const DataProvider = ({ children }) => {
  const [data, setData] = useState({openmessbox: null, closemessbox:null});

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

// Hook để sử dụng context
export const useData = () => {
    const context = useContext(DataContext);
    
    // Kiểm tra context có trả về đúng không
    if (!context) {
      throw new Error('useData must be used within a DataProvider');
    }
    
    return context;
  };