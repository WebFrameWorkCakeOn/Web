export type PopularStore = {
  storeid: number;
  name: string;
  rating: number;
  location: string;
  description: string;
  imageUrl: string;

  // 가게 상세 페이지 설명에 관한 부분!
  shortDescription?: string;
  fullDescription?: string;

  phoneNumber?: string;
  openingHours?: string;

  pickupNote?: string;
  pickupLinkText?: string;
};
export type PopularStoreProps = PopularStore;

export type Store = PopularStore;

//가게 포트폴리오에 대한 타입 정의
export interface Cake {
  imageUrl: string; // 케이크 사진 URL
  notice: string; // 케이크에 대한 문구
}
export interface PhotoFolioProps {
  cakes: Cake[];
  storeid: string;
}
