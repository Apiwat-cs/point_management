import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  TextField,
  InputAdornment,
  TablePagination,
  Stack,
} from "@mui/material";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import SearchIcon from "@mui/icons-material/Search";

export interface SearchCustomProps {
  search?: string | null;
  page?: number;
  pageSize?: number;
}

export type TableDataProps = Record<string, any>;

interface ReactTableProps {
  columns?: ColumnDef<TableDataProps>[];
  defaultColumns: ColumnDef<TableDataProps>[];
  data: TableDataProps[];
  loading?: boolean;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  onSearch?: (filter: SearchCustomProps) => void;
  actions?: React.ReactNode;
  setData?: any;
}

export default function ReactTable({
  defaultColumns,
  data,
  loading,
  pagination,
  onSearch,
  actions,
}: ReactTableProps) {
  const [searchValue, setSearchValue] = useState("");

  const table = useReactTable({
    data,
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setSearchValue(val);
    if (onSearch) {
      onSearch({ search: val, page: 1, pageSize: pagination?.pageSize || 10 });
    }
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    if (onSearch) {
      onSearch({
        search: searchValue,
        page: newPage + 1,
        pageSize: pagination?.pageSize || 10,
      });
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newSize = parseInt(event.target.value, 10);
    if (onSearch) {
      onSearch({ search: searchValue, page: 1, pageSize: newSize });
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#fff",
        borderRadius: "12px",
        border: "1px solid #E2E8F0",
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ p: 2, borderBottom: "1px solid #E2E8F0" }}
      >
        <TextField
          placeholder="ค้นหา..."
          value={searchValue}
          onChange={handleSearchChange}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" sx={{ color: "#94A3B8" }} />
              </InputAdornment>
            ),
          }}
          sx={{ width: { xs: "100%", sm: 300 } }}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>{actions}</Box>
      </Stack>

      <TableContainer component={Box} sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    sx={{
                      bgcolor: "#F8FAFC",
                      fontWeight: 600,
                      color: "#475569",
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={defaultColumns.length}
                  align="center"
                  sx={{ py: 6 }}
                >
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={defaultColumns.length}
                  align="center"
                  sx={{ py: 6, color: "#64748B" }}
                >
                  ไม่พบข้อมูล
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} hover>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      sx={{ border: "1px solid #e0e0e0" }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {pagination && (
        <TablePagination
          component="div"
          count={pagination.total}
          page={pagination.page - 1} // MUI uses 0-based
          onPageChange={handleChangePage}
          rowsPerPage={pagination.pageSize}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage=""
          rowsPerPageOptions={[]}
          sx={{
            ".MuiTablePagination-selectLabel": { display: "none" },
            ".MuiTablePagination-select": { display: "none" },
            ".MuiTablePagination-selectIcon": { display: "none" },
            borderBottom: "none",
          }}
        />
      )}
    </Box>
  );
}
