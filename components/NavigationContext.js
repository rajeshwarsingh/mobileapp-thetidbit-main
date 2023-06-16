import React, { useState } from 'react';

const NavigationContext = React.createContext();

const NavigationProvider = ({ children }) => {
  const [category, setCategory] = useState('');

  const updateCategory = (newCategory) => {
    setCategory(newCategory);
  };

  const contextValue = {
    category,
    updateCategory,
  };

  return (
    <NavigationContext.Provider value={contextValue}>{children}</NavigationContext.Provider>
  );
};

export { NavigationProvider };
export default NavigationContext;
