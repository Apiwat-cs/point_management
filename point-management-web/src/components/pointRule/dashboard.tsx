import React, { useMemo } from 'react';

// material-ui
import { Stack, Tooltip, IconButton, alpha, Chip } from "@mui/material";

// third-party
import type { ColumnDef, Row, CellContext } from "@tanstack/react-table";

// local types
import type { PointRule, PointRuleDashboardProps } from "./types";

// project components
import MainDashboard from "@/components/common/MainDashboard";
import type { TableDataProps } from "@/components/common/ReactTable";

// assets
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// ==============================|| ACTION BUTTONS ||============================== //

function TableActions({
  row,
  onEdit,
  onDelete,
}: {
  row: Row<TableDataProps>;
  onEdit: (val: PointRule) => void;
  onDelete: (id: string) => void;
  onStatusChange?: (id: string, status: "active" | "inactive") => void;
}) {
  const rule = row.original as unknown as PointRule;

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={1}
    >
      <Tooltip title="แก้ไข">
        <IconButton
          onClick={() => onEdit(rule)}
          sx={{
            p: 0.75,
            color: "#64748B",
            "&:hover": { color: "#1A69FF", bgcolor: alpha("#1A69FF", 0.08) },
          }}
        >
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="ลบ">
        <IconButton
          onClick={() => {
            const id = rule.id;
            if (id) onDelete(id);
          }}
          sx={{
            p: 0.75,
            color: "#94A3B8",
            "&:hover": { color: "#EF4444", bgcolor: alpha("#EF4444", 0.08) },
          }}
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

// ==============================|| POINT RULE DASHBOARD ||============================== //

const PointRuleDashboard: React.FC<PointRuleDashboardProps> = ({
  pointRules,
  onEdit,
  onDelete,
  onAdd,
  onStatusChange,
  onParamsChange,
  loading,
  pagination: customPagination,
}) => {
  const columns = useMemo<ColumnDef<TableDataProps>[]>(
    () => [
      {
        id: "activityCode",
        header: "Activity Code",
        accessorFn: (row) => {
          const r = row as unknown as PointRule;
          return r.activityCode || "-";
        },
        dataType: "text",
      },
      {
        id: "activityName",
        header: "Activity Name",
        accessorFn: (row) => {
          const r = row as unknown as PointRule;
          return r.activityName || "-";
        },
        dataType: "text",
      },
      {
        id: "point",
        header: "Point",
        accessorKey: "point",
        dataType: "text",
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: (info: CellContext<TableDataProps, unknown>) => {
          const isActive = info.getValue() === "active";

          return (
            <Chip
              label={isActive ? "Active" : "Inactive"}
              size="small"
              sx={{
                borderRadius: "8px",
                fontWeight: 700,
                bgcolor: isActive ? alpha("#10B981", 0.1) : alpha("#EF4444", 0.1),
                color: isActive ? "#059669" : "#DC2626",
                minWidth: "65px",
              }}
            />
          );
        },
        dataType: "text",
      },
      {
        id: "actions",
        header: "",
        size: 80,
        cell: ({ row }) => (
          <TableActions
            row={row}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ),
        meta: { className: "cell-center" },
      },
    ],
    [onEdit, onDelete, onStatusChange],
  );

  const pagination = useMemo(
    () =>
      customPagination || {
        page: 1,
        pageSize: pointRules.length || 10,
        total: pointRules.length,
        totalPages: 1,
      },
    [pointRules.length, customPagination],
  );

  const tableData = useMemo(
    () => pointRules.map((rule) => ({ ...rule })),
    [pointRules],
  );

  return (
    <MainDashboard
      loading={loading}
      data={tableData as unknown as TableDataProps[]}
      columns={columns}
      pagination={pagination}
      onParamsChange={onParamsChange}
      onAdd={onAdd}
      addButtonLabel="สร้าง Point Rule"
    />
  );
};

export default PointRuleDashboard;
