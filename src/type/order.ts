import type {
  UseFormRegister,
  UseFormSetValue,
  Control,
  UseFormRegisterReturn,
  FieldError,
} from "react-hook-form";
// 유저 정보 프롭스
export interface OrderUserInfoFormProps {
  register: UseFormRegister<OrderFormValues>;
  errorUserName?: FieldError;
  errorUserPhone?: FieldError;
}

//케이크 사이즈 프롭스
export interface CakeSize {
  sizeName: string;
  diameterText: string;
  peopleText: string;
  priceAverage: number;
}

export interface OrderCakeSizeSelectorProps {
  sizes: CakeSize[];
  selectedSize: string | null;
  error?: FieldError;
  setValue: UseFormSetValue<OrderFormValues>;
}

//케이크 맛 프롭스
export interface FlavorOption {
  name: string;
  price: number;
}

export interface OrderFlavorSelectorProps {
  flavors: FlavorOption[];
  registerFlavor: UseFormRegisterReturn;
  selectedFlavor: string | null;
  error?: FieldError;
}
//케이크 모양 프롭스
export interface ShapeOption {
  name: string;
  price: number;
}
export interface OrderShapeSelectorProps {
  shapes: ShapeOption[];
  selectedShape: number | null;
  setValue: UseFormSetValue<OrderFormValues>;
  error?: FieldError;
}
//케이크  픽업 날짜 프롭스
export interface OrderPickupDateTimeProps {
  control: Control<OrderFormValues>;
  setValue: UseFormSetValue<OrderFormValues>;
  value: Date | null;
  error?: FieldError;
}
//케이크 디자인 파일 프롭스
export interface OrderDesignUploadProps {
  register: UseFormRegister<OrderFormValues>;
  setValue: UseFormSetValue<OrderFormValues>;
  fileName: string;
}

//오더 폼 -> 주의사항 프롭스
export type OrderNoticesProps = {
  registerAgree: UseFormRegisterReturn;
  error?: FieldError;
};

// 초 + 보냉백 프롭스
export interface OrderAddsOptionsProps {
  registerCandleCount: UseFormRegisterReturn;
  isCoolerBagSelected: boolean;
  toggleCoolerBag: () => void;
}
// 케이크 문구 프롭스
export interface OrderMessageFormProps {
  registerMessage: UseFormRegisterReturn;
  message: string;
  error?: FieldError;
}
// 추가 기타 옵션 프롭스
export interface OrderEtcFormProps {
  registerEtc: UseFormRegisterReturn;
  etc: string;
  error?: FieldError;
}
// 전체 폼
export interface OrderFormValues {
  userName: string;
  userPhone: string;
  pickupDateTime: Date | null;
  selectedSizeIndex: string | null;
  selectedFlavorIndex: string | null;
  selectedShapeIndex: number | null;
  message: string;
  etc: string;
  agreed: boolean;
  candleCount: number | string;
  isCoolerBagSelected: boolean;
  fileName: string;
  file?: File | null;
  cakeSize: string;
}

export const CUSTOM_CAKE_DATA: CakeSize[] = [
  {
    sizeName: "도시락 케이크",
    diameterText: "9cm ~ 12cm 내외",
    peopleText: "1~2명",
    priceAverage: 27500,
  },
  {
    sizeName: "1호",
    diameterText: "15cm 내외",
    peopleText: "2~3명",
    priceAverage: 50000,
  },
  {
    sizeName: "2호",
    diameterText: "18cm 내외",
    peopleText: "4~6명",
    priceAverage: 75000,
  },
  {
    sizeName: "3호",
    diameterText: "21cm 내외",
    peopleText: "7~10명",
    priceAverage: 105000,
  },
  {
    sizeName: "4호",
    diameterText: "24cm 내외",
    peopleText: "10~15명",
    priceAverage: 120000,
  },
];

export const FLAVOR_OPTIONS: FlavorOption[] = [
  { name: "바닐라", price: 0 },
  { name: "초코", price: 5000 },
];

export const SHAPE_OPTIONS: ShapeOption[] = [
  { name: "원형", price: 0 },
  { name: "하트", price: 5000 },
];
