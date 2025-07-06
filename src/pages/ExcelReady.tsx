import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  ChevronDown,
  Calendar,
  Building,
  TrendingUp,
  Search,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import {
  setSelectedCompany,
  setSelectedYear,
  setSelectedMonth,
  setAvailableYears,
  setAvailableMonths,
} from "../store/slices/filtersSlice";
import Footer from "../components/Footer";
import { getAvailableMonths, getAvailableYears } from "../utils/excelReader";

const ExcelReady = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    selectedCompany,
    selectedYear,
    selectedMonth,
    availableCompanies,
    availableYears,
    availableMonths,
  } = useAppSelector((state) => state.filters);
  const { fileName, data } = useAppSelector((state) => state.excelData);

  const [dropdownOpen, setDropdownOpen] = useState({
    company: false,
    year: false,
    month: false,
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Filter companies based on search term
  const filteredCompanies = availableCompanies.filter((company) =>
    company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown-container")) {
        setDropdownOpen({ company: false, year: false, month: false });
        setSearchTerm(""); // Clear search when closing
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      const years = getAvailableYears(data, selectedCompany);
      dispatch(setAvailableYears(years));
      // if (selectedYear) {
      //   dispatch(setSelectedYear(selectedYear));
      // } else {
        dispatch(setSelectedYear(""));
        dispatch(setSelectedMonth(""));
      // }
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (selectedYear) {
      const months = getAvailableMonths(data, selectedCompany, selectedYear);
      dispatch(setAvailableMonths(months));
    }
  }, [selectedYear]);

  const handleDropdownToggle = (dropdown: string) => {
    setDropdownOpen((prev) => ({
      company: false,
      year: false,
      month: false,
      [dropdown]: !prev[dropdown as keyof typeof prev],
    }));

    // Clear search when opening/closing company dropdown
    if (dropdown === "company") {
      setSearchTerm("");
    }
  };

  const handleSelection = (type: string, value: string) => {
    switch (type) {
      case "company":
        dispatch(setSelectedCompany(value));
        setSearchTerm(""); // Clear search after selection
        break;
      case "year":
        dispatch(setSelectedYear(value));
        break;
      case "month":
        dispatch(setSelectedMonth(value));
        break;
    }
    setDropdownOpen((prev) => ({ ...prev, [type]: false }));
  };

  const handleViewDashboard = () => {
    if (selectedCompany && selectedYear && selectedMonth) {
      navigate("/dashboard");
    }
  };

  const isFormComplete = selectedCompany && selectedYear && selectedMonth;

  const CustomDropdown = ({
    label,
    value,
    options,
    type,
    icon: Icon,
    hasSearch = false,
  }: {
    label: string;
    value: string;
    options: string[];
    type: string;
    icon: React.ElementType;
    hasSearch?: boolean;
  }) => (
    <div className="relative dropdown-container">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <button
          onClick={() => handleDropdownToggle(type)}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon className="w-5 h-5 text-gray-400" />
              <span className={value ? "text-gray-900" : "text-gray-500"}>
                {value || `Select ${label.toLowerCase()}`}
              </span>
            </div>
            <div
              className={`transform transition-transform duration-200 ${
                dropdownOpen[type as keyof typeof dropdownOpen]
                  ? "rotate-180"
                  : "rotate-0"
              }`}
            >
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </button>

        {dropdownOpen[type as keyof typeof dropdownOpen] && (
          <div className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg shadow-xl mt-1 max-h-60 overflow-hidden">
            {hasSearch && (
              <div className="p-3 border-b border-gray-200">
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder={`Search ${label.toLowerCase()}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            )}
            <div className="max-h-48 overflow-y-auto">
              {(hasSearch ? filteredCompanies : options).length > 0 ? (
                (hasSearch ? filteredCompanies : options).map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelection(type, option)}
                    className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-150 focus:outline-none focus:bg-blue-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{option}</span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500 text-sm">
                  No {label.toLowerCase()} found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="pt-20">
        <div className="container mx-auto px-4 py-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Excel data is ready to explore!
            </h1>

            <p className="text-lg text-gray-600 mb-4">
              Select your filters below to dive into your business analytics and
              unlock powerful insights.
            </p>

            {fileName && (
              <p className="text-sm text-blue-600 bg-blue-50 px-4 py-2 rounded-lg inline-block">
                File: {fileName}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8"
          >
            <div className="space-y-6">
              <CustomDropdown
                label="Hotel"
                value={selectedCompany}
                options={availableCompanies}
                type="company"
                icon={Building}
                hasSearch={true}
              />

              <CustomDropdown
                label="Year"
                value={selectedYear}
                options={availableYears}
                type="year"
                icon={Calendar}
              />

              <CustomDropdown
                label="Month"
                value={selectedMonth}
                options={availableMonths}
                type="month"
                icon={TrendingUp}
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 pt-6 border-t border-gray-200"
            >
              <button
                onClick={handleViewDashboard}
                disabled={!isFormComplete}
                className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                  isFormComplete
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {isFormComplete
                  ? "View Dashboard"
                  : "Please complete all selections"}
              </button>
            </motion.div>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 text-center"
          >
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <span>Step 2 of 3</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ExcelReady;
