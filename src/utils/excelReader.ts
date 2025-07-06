import * as XLSX from "xlsx";

export async function readExcelFile(
  file: File,
  sheetName: string = "Monthly numbers"
) {
  return new Promise<any[]>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      // Check if the sheet exists
      if (!workbook.SheetNames.includes(sheetName)) {
        reject(`Sheet "${sheetName}" not found in the Excel file.`);
        return;
      }

      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        raw: true,
        defval: null,
      }); // defval: null fills empty cells with null

      // Convert 'Date' fields from serial to JS Date
      const parsedData = jsonData.map((row: any) => {
        const newRow = { ...row };

        if (newRow.Date && typeof newRow.Date === "number") {
          const parsedDate = XLSX.SSF.parse_date_code(newRow.Date);
          if (parsedDate) {
            newRow.Date = new Date(
              parsedDate.y,
              parsedDate.m - 1,
              parsedDate.d
            );
          }
        } else if (typeof newRow.Date === "string") {
          // In case the cell is formatted as text date in Excel
          const parsed = new Date(newRow.Date);
          if (!isNaN(parsed.getTime())) {
            newRow.Date = parsed;
          }
        }

        return newRow;
      });

      resolve(parsedData);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
}

export const processExcelData = (data: any[]) => {
  // Mock processing - in real app, this would parse and validate Excel data
  return data.map((row, index) => ({
    company: row.Company || `Company ${index + 1}`,
    year: row.Year || 2024,
    month: row.Month || "January",
    revenue: row.Revenue || Math.random() * 100000,
    revPAR: row.RevPAR || Math.random() * 200,
    occupancy: row.Occupancy || Math.random() * 100,
    adr: row.ADR || Math.random() * 300,
  }));
};

export function getUniqueHotels(data: Array<any>) {
  const hotels = data.map((row) => row.Hotel).filter(Boolean);
  return Array.from(new Set(hotels));
}

export function getAvailableYears(data: Array<any>, selectedHotel: string) {
  const years = data
    .filter((row) => row.Hotel === selectedHotel)
    .map((row) => new Date(row.Date).getFullYear());
  return Array.from(new Set(years)).sort((a, b) => a - b);
}

export function getAvailableMonths(
  data: Array<any>,
  selectedHotel: string,
  selectedYear: any
) {
 const months = data
    .filter(
      (row) =>
        row.Hotel === selectedHotel &&
        new Date(row.Date).getFullYear() === selectedYear
    )
    .map((row) => new Date(row.Date).getMonth()); // 0-indexed months

  const uniqueMonths = Array.from(new Set(months)).sort((a, b) => a - b);

  // Convert to month names
  const monthNames = uniqueMonths.map((monthIndex) =>
    new Date(0, monthIndex).toLocaleString('default', { month: 'long' })
  );

  return monthNames;
}

export function getMonthNumber(monthName: string) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const index = months.findIndex(m => m.toLowerCase() === monthName.toLowerCase());
  return index >= 0 ? index + 1 : 1;
}

export function calculateGrowth(current: number, previous?: number) {
  if (!previous || previous === 0) return 0;
  return Number((((current - previous) / previous) * 100).toFixed(2));
}
