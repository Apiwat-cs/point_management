import React from "react";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ReactTable from "./ReactTable";
import type { TableDataProps, SearchCustomProps } from "./ReactTable";
import type { ColumnDef } from "@tanstack/react-table";

interface MainDashboardProps {
  columns: ColumnDef<TableDataProps>[];
  data: TableDataProps[];
  loading?: boolean;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  onParamsChange?: (params: {
    search?: string;
    page?: number;
    pageSize?: number;
  }) => void;
  onAdd?: () => void;
  addButtonLabel?: string;
}

const MainDashboard: React.FC<MainDashboardProps> = ({
  columns,
  data,
  loading,
  pagination,
  onParamsChange,
  onAdd,
  addButtonLabel = "สร้างรายการใหม่",
}) => {
  const handleTableChange = (filter: SearchCustomProps) => {
    if (onParamsChange) {
      onParamsChange({
        search: filter.search != null ? String(filter.search) : undefined,
        page: filter.page,
        pageSize: filter.pageSize,
      });
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
      }}
    >
      <ReactTable
        loading={loading}
        data={data}
        defaultColumns={columns}
        pagination={pagination}
        setData={() => {}}
        onSearch={handleTableChange}
        actions={
          onAdd && (
            <Button variant="contained" startIcon={<AddIcon />} onClick={onAdd}>
              {addButtonLabel}
            </Button>
          )
        }
      />
    </Box>
  );
};

export default MainDashboard;
