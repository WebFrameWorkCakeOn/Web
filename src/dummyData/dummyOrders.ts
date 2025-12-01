import localCoffee from "../assets/cakeImg/IMG_5969.jpg";
import localBread from "../assets/cakeImg/IMG_5970 2.jpg";
import localLatte from "../assets/cakeImg/IMG_5972.jpg";
import localCake from "../assets/cakeImg/IMG_5978.jpg";
import type { StoreStats, OrderListItemData } from "../type/mystore";

export const initialStoreStats: StoreStats = {
  totalOrders: 3,
  preparing: 1,
  completed: 2,
};

export const dummyOrders: OrderListItemData[] = [
  {
    id: "ORD00001",
    timeAgo: "2시간 전",
    status: "완료",
    totalPrice: 63800,
    items: [
      { name: "커스텀 케이크", count: 2, price: 30000, image: localCoffee },
      { name: "딸기 케이크", count: 1, price: 38000, image: localBread },
    ],
  },
  {
    id: "ORD00003",
    timeAgo: "5시간 전",
    status: "완료",
    totalPrice: 78000,
    items: [
      { name: "커스텀 케이크", count: 1, price: 35000, image: localLatte },
      { name: "커스텀 케이크", count: 2, price: 43000, image: localCake },
    ],
  },
  {
    id: "ORD00005",
    timeAgo: "27분 전",
    status: "제조중",
    totalPrice: 121000,
    items: [
      { name: "커스텀 케이크", count: 1, price: 45000, image: localCoffee },
      { name: "딸기 케이크", count: 2, price: 76000, image: localBread },
    ],
  },
];
