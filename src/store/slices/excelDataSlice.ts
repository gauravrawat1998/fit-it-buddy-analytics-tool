import { createSlice } from "@reduxjs/toolkit";

export interface ExcelDataRow {
  company: string;
  year: number;
  month: string;
  revenue: number;
  revPAR: number;
  occupancy: number;
  adr: number;
}

interface ExcelDataState {
  data: [];
  isProcessed: boolean;
  fileName: string | null;
  uploadedAt: string | null;
}

const initialState: ExcelDataState = {
  data: [],
  isProcessed: false,
  fileName: null,
  uploadedAt: null,
};

const excelDataSlice = createSlice({
  name: "excelData",
  initialState,
  reducers: {
    setExcelData: (state, action) => {
      state.data = action.payload.data;
      state.fileName = action.payload.fileName;
      state.isProcessed = true;
      state.uploadedAt = new Date().toISOString();
    },
    clearExcelData: (state) => {
      state.data = [];
      state.isProcessed = false;
      state.fileName = null;
      state.uploadedAt = null;
    },
    updateDataRow: (state: any, action) => {
      const { index, data } = action.payload;
      if (state.data[index]) {
        state.data[index] = { ...state.data[index], ...data };
      }
    },
  },
});

export const { setExcelData, clearExcelData, updateDataRow } =
  excelDataSlice.actions;
export default excelDataSlice.reducer;
