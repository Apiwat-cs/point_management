import React from "react";
import { NavLink as RouterLink, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";

// menu items
import { pms } from "./pms";

const DRAWER_WIDTH = 260;

const PmsSidebar: React.FC = () => {
  const theme = useTheme();
  const { pathname } = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          borderRight: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="primary">
          PMS Admin
        </Typography>
      </Box>

      <Box sx={{ overflow: "auto", mt: 2, px: 1 }}>
        <Typography
          variant="caption"
          sx={{
            px: 2,
            pb: 1,
            display: "block",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "text.secondary",
            fontSize: "0.7rem",
          }}
        >
          {pms.title as string}
        </Typography>

        <List disablePadding>
          {pms.children?.map((item: any) => {
            const isActive =
              pathname === item.url ||
              (item.url ? pathname.startsWith(item.url + "/") : false);
            const Icon = item.icon;

            return (
              <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={RouterLink}
                  to={item.url ?? "#"}
                  sx={{
                    borderRadius: "8px",
                    py: 1.2,
                    px: 2,
                    minHeight: 44,
                    color: isActive
                      ? theme.palette.primary.main
                      : "text.secondary",
                    bgcolor: isActive
                      ? alpha(theme.palette.primary.main, 0.08)
                      : "transparent",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.main, 0.04),
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 36,
                      color: isActive
                        ? theme.palette.primary.main
                        : "text.secondary",
                    }}
                  >
                    {Icon && <Icon size={20} />}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title as string}
                    primaryTypographyProps={{
                      fontSize: "0.88rem",
                      fontWeight: isActive ? 700 : 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default PmsSidebar;
