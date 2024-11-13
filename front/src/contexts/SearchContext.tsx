"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface SearchContextType {
  searchValue: number | undefined;
  setSearchValue: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [searchValue, setSearchValue] = useState<number | undefined>(undefined);

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
