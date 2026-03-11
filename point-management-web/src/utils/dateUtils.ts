/**
 * Option structure for month selection
 */
export interface MonthOption {
  value: string; // Format: "YYYY-MM"
  label: string; // Format: "เดือน พ.ศ." (e.g., กุมภาพันธ์ 2569)
}

/**
 * Thai full month names
 */
const THAI_MONTHS: readonly string[] = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
] as const;

/**
 * Generates a list of past months starting from the current local time.
 * 
 * @param count - Number of months to generate (default: 12)
 * @returns Array of MonthOption with Thai labels and YYYY-MM values
 */
export const generatePastMonths = (count: number = 12): MonthOption[] => {
  const options: MonthOption[] = [];
  const now = new Date();
  
  // Set to first day of current month to avoid issues when current day is 31st
  // and we subtract months to a month that has fewer days.
  const cursor = new Date(now.getFullYear(), now.getMonth(), 1);

  for (let i = 0; i < count; i++) {
    const year = cursor.getFullYear();
    const month = cursor.getMonth(); // 0-indexed
    
    // Format YYYY-MM
    const monthValue = String(month + 1).padStart(2, '0');
    const value = `${year}-${monthValue}`;
    
    // Format Label (Thai Month + Buddhist Era Year)
    const thaiYear = year + 543;
    const label = `${THAI_MONTHS[month]} ${thaiYear}`;
    
    options.push({ value, label });
    
    // Move to previous month
    cursor.setMonth(cursor.getMonth() - 1);
  }

  return options;
};

/**
 * Gets the current month in YYYY-MM format based on local time.
 */
export const getCurrentMonthValue = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};
