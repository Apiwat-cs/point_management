import React, { useMemo } from "react";

// material-ui
import { Stack, Tooltip, IconButton, alpha } from "@mui/material";

// assets
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// tanstack table
import type { ColumnDef, Row } from "@tanstack/react-table";

// project components
import MainDashboard from "@/components/common/MainDashboard";
import type { TableDataProps } from "@/components/common/ReactTable";

// local types
import type { Activity, ActivityDashboardProps } from "./types";

// ==============================|| ACTION BUTTONS ||============================== //

function TableActions({
  row,
  onEdit,
  onDelete,
}: {
  row: Row<TableDataProps>;
  onEdit: (val: Activity) => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
}) {
  const activity = row.original as unknown as Activity;

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={1}
    >
      <Tooltip title="แก้ไข">
        <IconButton
          onClick={() => onEdit(activity)}
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
            const id = activity.id;
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

// ==============================|| ACTIVITY DASHBOARD ||============================== //

const ActivityDashboard: React.FC<ActivityDashboardProps> = ({
  activities,
  onEdit,
  onDelete,
  onAdd,
  onParamsChange,
  loading,
  pagination: customPagination,
}) => {
  const columns = useMemo<ColumnDef<TableDataProps>[]>(
    () => [
      {
        id: "code",
        header: "Code",
        accessorKey: "code",
        dataType: "text",
      },
      {
        id: "displayTh",
        header: "Display TH",
        accessorKey: "displayTh",
        dataType: "text",
      },
      {
        id: "displayEn",
        header: "Display EN",
        accessorKey: "displayEn",
        dataType: "text",
      },
      {
        id: "createDate",
        header: "Create Date",
        accessorFn: (row) => {
          const val = (row as unknown as Activity).createDate;
          return val
            ? new Date(val).toLocaleDateString("th-TH", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "-";
        },
        dataType: "text",
      },
      {
        id: "actions",
        header: "",
        size: 80,
        cell: ({ row }) => (
          <TableActions row={row} onEdit={onEdit} onDelete={onDelete} />
        ),
        meta: { className: "cell-center" },
      },
    ],
    [onEdit, onDelete],
  );

  const pagination = useMemo(
    () =>
      customPagination || {
        page: 1,
        pageSize: activities.length,
        total: activities.length,
        totalPages: 1,
      },
    [activities.length, customPagination],
  );

  const tableData = useMemo(
    () =>
      activities.map((activity) => ({
        ...activity,
        id: activity.id,
      })),
    [activities],
  );

  return (
    <MainDashboard
      loading={loading}
      data={tableData as unknown as TableDataProps[]}
      columns={columns}
      pagination={pagination}
      onParamsChange={onParamsChange}
      onAdd={onAdd}
      addButtonLabel="สร้าง Activity"
    />
  );
};

export default ActivityDashboard;
