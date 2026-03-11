import {
  Building3,
  TaskSquare,
  MoneyRecive,
  Wallet3,
  KeySquare,
  Chart21,
} from "iconsax-react";

export const pms = {
  id: "group-pms",
  title: "ระบบสะสมแต้ม",
  type: "group",
  children: [
    {
      id: "dashboard",
      title: "แดชบอร์ด",
      type: "item",
      url: "/dashboard",
      icon: Chart21,
    },
    {
      id: "activity",
      title: "กิจกรรม (Activity)",
      type: "item",
      url: "/activity",
      icon: TaskSquare,
    },
    {
      id: "point-rule",
      title: "กติกาการให้แต้ม (Rule)",
      type: "item",
      url: "/point-rule",
      icon: Building3,
    },
    {
      id: "point-transaction",
      title: "รายการสะสมแต้ม",
      type: "item",
      url: "/transaction",
      icon: Wallet3,
    },
    {
      id: "point-leaderboard",
      title: "จัดอันดับ (Leaderboard)",
      type: "item",
      url: "/leaderboard",
      icon: MoneyRecive,
    },
    {
      id: "api-key",
      title: "จัดการ API Key",
      type: "item",
      url: "/api-key",
      icon: KeySquare,
    },
  ],
};
