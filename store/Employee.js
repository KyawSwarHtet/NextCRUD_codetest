import {create} from "zustand";
import { getAllEmployee,createEmployee,updateEmployee,deleteEmployee} from "../api/employee_api";

let cacheData;
if (typeof window !== "undefined"){
     cacheData = JSON.parse(localStorage.getItem("cachedData"));  
}

export const useEmployeesStore = create((set, get) => ({
  employeeList: cacheData? cacheData: [],
  isLoading: false,
  error: null,
  getAllEmployee: async () => {
    try {
      set({ isLoading: true });
        const response = await getAllEmployee();
        localStorage.setItem('cachedData', JSON.stringify(response.data.data))
        set({ isLoading: false, employeeList: response.data.data }); 
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
    },
  
  createEmployee: async (data) => {
    try {
      set({ isLoading: true });
        const response = await createEmployee(data);
        const updatedData = [...get().employeeList, response.data.data];

      set ({ isLoading: false, employeeList:updatedData });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
    },
  
  updateEmployee: async (id,data) => {
    try {
      set({ isLoading: true });
        const response = await updateEmployee(id, data);
        const responseData = response.data.data.data

        const filteredData = get().employeeList.filter(data => data.id !== id)
        
        const updatedData = [...filteredData, responseData];
        const sortedData = updatedData.sort((a, b) => a.id - b.id);
      
        localStorage.setItem('cachedData', JSON.stringify(sortedData))
        set({ isLoading: false, employeeList : sortedData });
        
        
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
    },
  
  deleteEmployee: async (id) => {
    try {
      set({ isLoading: true });
        await deleteEmployee(id);
        const filteredData = get().employeeList.filter(data => data.id !== id)
     
      localStorage.setItem('cachedData', JSON.stringify(filteredData))
        set({ isLoading: false, employeeList : filteredData });
    
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
}));