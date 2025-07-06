import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersState {
  selectedCompany: string;
  selectedYear: string;
  selectedMonth: string;
  availableCompanies: string[];
  availableYears: string[];
  availableMonths: string[];
}

const initialState: FiltersState = {
  selectedCompany: "",
  selectedYear: "",
  selectedMonth: "",
  availableCompanies: [],
  availableYears: [],
  availableMonths: [],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSelectedCompany: (state, action: PayloadAction<string>) => {
      state.selectedCompany = action.payload;
    },
    setSelectedYear: (state, action: PayloadAction<string>) => {
      state.selectedYear = action.payload;
    },
    setSelectedMonth: (state, action: PayloadAction<string>) => {
      state.selectedMonth = action.payload;
    },
    setAvailableCompanies: (state, action) => {
      state.availableCompanies = action.payload;
    },
    setAvailableYears: (state, action) => {
      state.availableYears = action.payload;
    },
    setAvailableMonths: (state, action) => {
      state.availableMonths = action.payload;
    },
    clearFilters: (state) => {
      state.selectedCompany = "";
      state.selectedYear = "";
      state.selectedMonth = "";
    },
  },
});

export const {
  setSelectedCompany,
  setSelectedYear,
  setSelectedMonth,
  setAvailableCompanies,
  setAvailableYears,
  setAvailableMonths,
  clearFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
