import { createContext, useState, ReactNode, useContext } from "react";
import { Purchase } from "types/purchase";



interface FilterContextType {
  lista: Purchase[];
  setLista: React.Dispatch<React.SetStateAction<Purchase[]>>;
}


const FilterContext = createContext<FilterContextType | null>(null);


interface FilterProviderProps {
  children: ReactNode;
}


function FilterProvider({ children }: FilterProviderProps) {
  const [lista, setLista] = useState<Purchase[]>([]);

  return (
    <FilterContext.Provider value={{ lista, setLista }}>
      {children}
    </FilterContext.Provider>
  );
}

const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext debe ser usado dentro de un FilterProvider');
  }
  return context;
};
export { FilterContext, FilterProvider, useFilterContext };