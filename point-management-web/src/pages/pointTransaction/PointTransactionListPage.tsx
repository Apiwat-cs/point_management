import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  Chip,
  Stack,
} from "@mui/material";
import { usePointTransactionActions } from "@/hooks/pointTransaction/usePointTransactionActions";
import ReactTable from "@/components/common/ReactTable";
import { createColumnHelper } from "@tanstack/react-table";
import type { PointTransaction } from "@/types/pms";
import dayjs from "dayjs";

const columnHelper = createColumnHelper<PointTransaction>();

const PointTransactionListPage: React.FC = () => {
  const { state, actions } = usePointTransactionActions();

  const columns = [
    columnHelper.accessor("userId", {
      header: "User ID",
      cell: (info) => (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {info.getValue()}
        </Typography>
      ),
    }),
    columnHelper.accessor("activityName", {
      header: "กิจกรรม",
      cell: (info) => (
        <Box>
          <Typography variant="body2">{info.getValue()}</Typography>
          <Typography variant="caption" color="text.secondary">
            {info.row.original.activityCode}
          </Typography>
        </Box>
      ),
    }),
    columnHelper.accessor("point", {
      header: "คะแนน",
      cell: (info) => (
        <Chip
          label={`+${info.getValue()}`}
          color="success"
          size="small"
          sx={{ fontWeight: 700, borderRadius: "6px" }}
        />
      ),
    }),
    columnHelper.accessor("referenceId", {
      header: "Ref ID",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("createDate", {
      header: "วันที่",
      cell: (info) => {
        const val = info.getValue();
        return val ? dayjs(val).format("DD/MM/YYYY HH:mm") : "-";
      },
    }),
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#1E293B" }}>
            ประวัติการสะสมแต้ม
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            ดูรายการความเคลื่อนไหวของการได้รับคะแนนทั้งหมดในระบบ
          </Typography>
        </Box>
      </Stack>

      <Card sx={{ borderRadius: 2, boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}>
        <ReactTable
          defaultColumns={columns as any}
          data={state.transactions}
          loading={state.loading}
          pagination={{
            total: state.total,
            page: state.params.page || 1,
            pageSize: state.params.pageSize || 10,
            totalPages: Math.ceil(state.total / (state.params.pageSize || 10)),
          }}
          onSearch={(filter) => {
            if (filter.search !== undefined && filter.search !== state.params.search) {
              actions.handleSearchChange(filter.search || "");
            }
            if (filter.page !== undefined && filter.page !== state.params.page) {
              actions.handlePageChange(filter.page);
            }
            if (filter.pageSize !== undefined && filter.pageSize !== state.params.pageSize) {
              actions.handleLimitChange(filter.pageSize);
            }
          }}
        />
      </Card>
    </Container>
  );
};

export default PointTransactionListPage;
