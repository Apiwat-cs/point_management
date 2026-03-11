import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  type SelectChangeEvent,
  CircularProgress,
  InputLabel,
  Box,
  ListSubheader,
  alpha,
} from "@mui/material";
import {
  generatePastMonths,
  getCurrentMonthValue,
  type MonthOption,
} from "@/utils/dateUtils";

interface ReportMonthPickerProps {
  /** Callback when API request is successful */
  onDataFetched?: (data: unknown) => void;
  /** Callback when an error occurs during fetching */
  onError?: (error: Error) => void;
  /** Label for the dropdown */
  label?: string;
  /** Show floating label above select (default: false for compact inline mode) */
  showLabel?: boolean;
  /** Custom count for past months (default: 12) */
  pastMonthsCount?: number;
}

/**
 * Production-ready Month Picker Component
 * Handles 12-month back-dated selection with Thai Buddhist Era labels.
 * Protects against race conditions using AbortController.
 */
const ReportMonthPicker: React.FC<ReportMonthPickerProps> = ({
  onDataFetched,
  onError,
  label = "เลือกเดือนที่ต้องการ",
  showLabel = false,
  pastMonthsCount = 12,
}) => {
  // 1. Controlled State: Initialized with current month (YYYY-MM)
  const [selectedMonth, setSelectedMonth] = useState<string>(
    getCurrentMonthValue(),
  );
  const [loading, setLoading] = useState<boolean>(false);

  // 2. memoized Options: Generated only once or when count changes
  const monthOptions = useMemo<MonthOption[]>(() => {
    return generatePastMonths(pastMonthsCount);
  }, [pastMonthsCount]);

  // 4. Group options by year for better readability
  const groupedOptions = useMemo(() => {
    const groups: Record<string, MonthOption[]> = {};
    monthOptions.forEach((option: MonthOption) => {
      const year = option.label.split(" ")[1]; // Extract Buddhist Year
      if (!groups[year]) groups[year] = [];
      groups[year].push(option);
    });
    return groups;
  }, [monthOptions]);

  /**
   * Mock API Call: fetchReport
   */
  const fetchReport = useCallback(
    async (month: string, signal: AbortSignal): Promise<void> => {
      try {
        setLoading(true);
        if (onDataFetched) onDataFetched({ month, timestamp: Date.now() });
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        if (onError && err instanceof Error) onError(err);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    },
    [onDataFetched, onError],
  );

  // 3. Side Effect: Fetch data whenever selectedMonth changes
  useEffect(() => {
    const controller = new AbortController();
    fetchReport(selectedMonth, controller.signal);
    return () => controller.abort();
  }, [selectedMonth, fetchReport]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <FormControl fullWidth size="small" disabled={loading}>
      {showLabel && <InputLabel id="month-picker-label">{label}</InputLabel>}
      <Select
        labelId={showLabel ? "month-picker-label" : undefined}
        value={selectedMonth}
        label={showLabel ? label : undefined}
        onChange={handleChange}
        renderValue={(value) => {
          const selected = monthOptions.find((o) => o.value === value);
          return selected ? selected.label : value;
        }}
        sx={{
          borderRadius: "8px",
          bgcolor: "transparent",
          height: showLabel ? undefined : "37px",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "& .MuiSelect-select": {
            display: "flex",
            alignItems: "center",
            fontWeight: 700,
            color: "#1A69FF",
            gap: 1,
            py: showLabel ? undefined : "0 !important",
          },
        }}
        endAdornment={
          loading ? (
            <Box sx={{ position: "absolute", right: 35, display: "flex" }}>
              <CircularProgress size={20} color="inherit" />
            </Box>
          ) : null
        }
      >
        {Object.entries(groupedOptions)
          .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
          .map(([year, options]) => [
            <ListSubheader
              key={`header-${year}`}
              sx={{
                fontWeight: 800,
                color: "#1A69FF",
                bgcolor: alpha("#1A69FF", 0.05),
                lineHeight: "36px",
              }}
            >
              ปี พ.ศ. {year}
            </ListSubheader>,
            ...options.map((option: MonthOption) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{ pl: 4, fontWeight: 500 }}
              >
                {option.label.split(" ")[0]}
              </MenuItem>
            )),
          ])}
      </Select>
    </FormControl>
  );
};

export default ReportMonthPicker;
