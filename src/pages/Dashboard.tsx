import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useRedux";
import MetricCard from "../components/MetricCard";
import BarChart from "../components/Charts/BarChart";
import LineChart from "../components/Charts/LineChart";
import Footer from "../components/Footer";
import { calculateGrowth, getMonthNumber } from "../utils/excelReader";

const Dashboard = () => {
  const navigate = useNavigate();
  const { selectedCompany, selectedYear, selectedMonth } = useAppSelector(
    (state) => state.filters
  );
  const { data: excelData, fileName } = useAppSelector(
    (state) => state.excelData
  );

  const [metrics, setMetrics] = useState<Array<any>>([]);
  const [barChartData, setBarChartData] = useState<Array<object>>([
    { name: "Revenue", current: 125000, previous: 118000 },
    { name: "Rev PAR", current: 89.5, previous: 85.2 },
    { name: "Occupancy", current: 78.5, previous: 82.1 },
    { name: "ADR", current: 156.8, previous: 148.9 },
  ]);

  const lineChartData = [
    { month: "Jan", current: 110000, previous: 105000 },
    { month: "Feb", current: 115000, previous: 108000 },
    { month: "Mar", current: 122000, previous: 115000 },
    { month: "Apr", current: 128000, previous: 118000 },
    { month: "May", current: 125000, previous: 118000 },
    { month: "Jun", current: 132000, previous: 125000 },
  ];

  useEffect(() => {
    if (excelData.length > 0) {
      const selectedMonthNumber = getMonthNumber(selectedMonth);
      const selectedYearNumber = parseInt(selectedYear);

      // Find the current year's data
      const filteredData = excelData.filter((row: any) => {
        const rowDate = new Date(row.Date);
        return (
          row.Hotel === selectedCompany &&
          rowDate.getFullYear() === selectedYearNumber &&
          rowDate.getMonth() === selectedMonthNumber - 1
        );
      });

      // Find the previous year's data
      const previousData = excelData.filter((row: any) => {
        const rowDate = new Date(row.Date);
        return (
          row.Hotel === selectedCompany &&
          rowDate.getFullYear() === selectedYearNumber - 1 &&
          rowDate.getMonth() === selectedMonthNumber - 1
        );
      });

      const currentData: any = filteredData[0];
      const previousDataRow: any = previousData[0];

      if (currentData) {
        const tempMetrics = [
          {
            title: "Revenue",
            value: currentData.Revenue,
            previousValue: previousDataRow?.Revenue ?? 0,
            growth: calculateGrowth(
              currentData.Revenue,
              previousDataRow?.Revenue
            ),
            icon: "revenue",
          },
          {
            title: "Rev PAR",
            value: currentData["Rev PAR"],
            previousValue: previousDataRow?.["Rev PAR"] ?? 0,
            growth: calculateGrowth(
              currentData["Rev PAR"],
              previousDataRow?.["Rev PAR"]
            ),
            icon: "revpar",
          },
          {
            title: "Occupancy",
            value: currentData.Occupancy * 100,
            previousValue: previousDataRow?.Occupancy * 100 || 0,
            growth: calculateGrowth(
              currentData.Occupancy,
              previousDataRow?.Occupancy
            ),
            icon: "occupancy",
          },
          {
            title: "ADR",
            value: currentData.ADR,
            previousValue: previousDataRow?.ADR ?? 0,
            growth: calculateGrowth(currentData.ADR, previousDataRow?.ADR),
            icon: "adr",
          },
        ]
        setMetrics(tempMetrics);

        const data = [
          {
            name: "Revenue",
            current: currentData.Revenue,
            previous: previousDataRow?.Revenue ?? 0,
          },
          {
            name: "Rev PAR",
            current: currentData["Rev PAR"],
            previous: previousDataRow?.["Rev PAR"],
          },
          {
            name: "Occupancy",
            current: currentData.Occupancy * 100 + "%",
            previous: previousDataRow?.Occupancy * 100 + "%",
          },
          {
            name: "ADR",
            current: currentData.ADR,
            previous: previousDataRow?.ADR,
          },
        ];

        setBarChartData(data);
      }
    }
  }, [excelData, selectedCompany, selectedYear, selectedMonth]);

  const handleBack = () => {
    navigate("/excel-ready");
  };

  const handleExport = () => {
    const exportData = {
      filters: { selectedCompany, selectedYear, selectedMonth },
      metrics,
      excelData,
      fileName,
      generated: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dashboard-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
          >
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <button
                onClick={handleBack}
                className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Business Analytics Dashboard
                </h1>
                <p className="text-gray-600 mt-1">
                  {selectedCompany} • {selectedMonth} {selectedYear}
                  {fileName && (
                    <span className="ml-2 text-blue-600">({fileName})</span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleExport}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Export
                </span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Filter className="w-4 h-4" onClick={() => navigate("/excel-ready")} />
                <span className="text-sm font-medium">Filter</span>
              </button>
            </div>
          </motion.div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric: any, index) => (
              <MetricCard
                key={metric.title}
                title={metric.title}
                value={metric.value}
                previousValue={metric.previousValue}
                growth={metric.growth}
                icon={metric.icon}
                index={index}
              />
            ))}
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <BarChart
              data={barChartData}
              title="Current vs Previous Year Comparison"
            />
            <LineChart data={lineChartData} title="Monthly Revenue Trends" />
          </div>

          {/* Summary Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Key Insights
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium text-green-800">
                    Revenue Growth
                  </span>
                  <span className="text-sm font-bold text-green-900">
                    +{metrics[0]?.growth.toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-blue-800">
                    ADR Improvement
                  </span>
                  <span className="text-sm font-bold text-blue-900">
                    +{metrics[3]?.growth.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm font-medium text-purple-800">
                    Rev PAR Growth
                  </span>
                  <span className="text-sm font-bold text-purple-900">
                    +{metrics[1]?.growth.toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <span className="text-sm font-medium text-orange-800">
                    Occupancy
                  </span>
                  <span className="text-sm font-bold text-orange-900">
                    {metrics[2]?.growth >= 0 ? "+" : ""}
                    {metrics[2]?.growth.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
