export interface OrderItem {
  name: string;
  count: number;
  price: number;
  image: string;
}

export interface OrderListItemData {
  id: string;
  timeAgo: string;
  status: "완료" | "제조중";
  totalPrice: number;
  items: OrderItem[];
}

export interface StoreStats {
  totalOrders: number;
  preparing: number;
  completed: number;
}

export interface MenuItem {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
}

export interface MenuItemCardProps {
  item: MenuItem;
  onEdit: (itemId: number) => void;
  onDelete: (itemId: number) => void;
}
