import {
  Building3,
  TaskSquare,
  MoneyRecive,
  Wallet3,
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
      title: "กิจกรรม",
      type: "item",
      url: "/activity",
      icon: TaskSquare,
    },
    {
      id: "point-rule",
      title: "กติกาการให้แต้ม",
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
      title: "จัดอันดับ",
      type: "item",
      url: "/leaderboard",
      icon: MoneyRecive,
    },
    {
      id: "playground",
      title: "Playground",
      type: "item",
      url: "/playground",
      icon: TaskSquare,
    },
  ],
};
