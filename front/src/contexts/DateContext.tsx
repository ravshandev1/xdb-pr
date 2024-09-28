"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface DateContextType {
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const DateContext = createContext<DateContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const DateProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DateContext.Provider
      value={{
        date,
        setDate,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

export const useDate = (): DateContextType => {
  const context = useContext(DateContext);
  if (context === undefined) {
    throw new Error("useDate must be used within a DateProvider");
  }
  return context;
};
