import React, { createContext, useContext, useState } from "react";

const CarOwnerContext = createContext();

export const CarOwnerProvider = ({ children }) => {
  const [owners, setOwners] = useState([]); // 存儲所有車主資料

  // 根據 idNum 獲取特定車主
  const getOwnerByIdNum = (idNum) => {
    return owners.find((owner) => owner.idNum === idNum);
  };

  return (
    <CarOwnerContext.Provider value={{ owners, setOwners, getOwnerByIdNum }}>
      {children}
    </CarOwnerContext.Provider>
  );
};

export const useCarOwner = () => useContext(CarOwnerContext);
