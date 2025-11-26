import { z } from "zod";

export const orderFormSchema = z.object({
  userName: z.string().min(2, "이름은 최소 2글자 이상이어야 합니다"),
  userPhone: z
    .string()
    .min(1, "전화번호를 입력하세요")
    .regex(/^\d{3}-\d{3,4}-\d{4}$/, "전화번호 형식이 올바르지 않습니다"),
  pickupDateTime: z
    .date()
    .nullable()
    .refine((val) => val !== null, "날짜를 선택하세요"),
  selectedSizeIndex: z
    .string()
    .nullable()
    .refine(
      (val) => typeof val === "string" && !!val,
      "케이크 사이즈를 선택하세요"
    ),
  selectedFlavorIndex: z
    .string()
    .nullable()
    .refine(
      (val) => typeof val === "string" && !!val,
      "케이크 맛을 선택하세요"
    ),
  selectedShapeIndex: z
    .number()
    .nullable()
    .refine((val) => val !== null, "모양을 선택하세요"),
  message: z.string().max(20, "문구는 20글자 이하여야 합니다"),
  etc: z.string().max(120, "기타 요청은 120글자 이하여야 합니다"),
  agreed: z
    .boolean()
    .refine((val) => val === true, "필독 사항 확인 및 동의가 필요합니다"),
  candleCount: z
    .union([z.number(), z.string()])
    .transform((val) => Number(val))
    .refine(
      (val) => !isNaN(val) && val >= 0,
      "초 갯수는 0 이상 숫자여야 합니다"
    ),
  isCoolerBagSelected: z.boolean(),
  fileName: z.string(),
  file: z.instanceof(File).nullable().optional(),
  cakeSize: z.string().min(1, "케이크 크기를 골라주세요"),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;
