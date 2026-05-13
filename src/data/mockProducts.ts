import type { Product, Store } from "../types/product";

export const defaultUserLocation = {
  lat: 37.588227,
  lng: 126.993606,
  address: "서울 성북구 성북동",
};

const images = {
  bread:
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop",
  sandwich:
    "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=800&auto=format&fit=crop",
  cake:
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop",
  dessert:
    "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop",
  coffee:
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
  drink:
    "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=800&auto=format&fit=crop",
  apple:
    "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=800&auto=format&fit=crop",
  vegetable:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop",
  lunchBox:
    "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop",
  sideDish:
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop",
};

export const mockStores: Store[] = [
  {
    id: "s1",
    name: "파리바게뜨 성북동점",
    brand: "파리바게뜨",
    address: "서울 성북구 성북로 84",
    distance: 0.18,
    distanceText: "180m",
    rating: 4.7,
    lat: 37.5892,
    lng: 126.9951,
    imageUrl: images.bread,
    openUntil: "22:00",
  },
  {
    id: "s2",
    name: "뚜레쥬르 혜화로터리점",
    brand: "뚜레쥬르",
    address: "서울 종로구 창경궁로 263",
    distance: 0.26,
    distanceText: "260m",
    rating: 4.6,
    lat: 37.5869,
    lng: 126.9918,
    imageUrl: images.sandwich,
    openUntil: "21:30",
  },
  {
    id: "s3",
    name: "성북 과일가게",
    brand: "지역농산물",
    address: "서울 성북구 성북로 96",
    distance: 0.31,
    distanceText: "310m",
    rating: 4.8,
    lat: 37.5901,
    lng: 126.9962,
    imageUrl: images.apple,
    openUntil: "20:00",
  },
  {
    id: "s4",
    name: "혜화 신선마켓",
    brand: "로컬마켓",
    address: "서울 종로구 대학로 135",
    distance: 0.38,
    distanceText: "380m",
    rating: 4.5,
    lat: 37.5849,
    lng: 126.9942,
    imageUrl: images.vegetable,
    openUntil: "21:00",
  },
  {
    id: "s5",
    name: "엄마손 반찬 성북점",
    brand: "반찬가게",
    address: "서울 성북구 동소문로 15",
    distance: 0.55,
    distanceText: "550m",
    rating: 4.6,
    lat: 37.5887,
    lng: 127.0001,
    imageUrl: images.sideDish,
    openUntil: "20:30",
  },
  {
    id: "s6",
    name: "든든도시락 혜화점",
    brand: "도시락",
    address: "서울 종로구 대학로 120",
    distance: 0.63,
    distanceText: "630m",
    rating: 4.4,
    lat: 37.5833,
    lng: 126.9915,
    imageUrl: images.lunchBox,
    openUntil: "21:00",
  },
  {
    id: "s7",
    name: "성북 로컬푸드 마켓",
    brand: "로컬푸드",
    address: "서울 성북구 성북로 118",
    distance: 0.82,
    distanceText: "820m",
    rating: 4.5,
    lat: 37.5931,
    lng: 126.9961,
    imageUrl: images.vegetable,
    openUntil: "21:00",
  },
  {
    id: "s8",
    name: "혜화 디저트샵",
    brand: "디저트",
    address: "서울 종로구 동숭길 55",
    distance: 0.67,
    distanceText: "670m",
    rating: 4.7,
    lat: 37.5825,
    lng: 126.9952,
    imageUrl: images.dessert,
    openUntil: "22:00",
  },
  {
    id: "s9",
    name: "그린빈 카페",
    brand: "카페",
    address: "서울 성북구 성북로 102",
    distance: 0.42,
    distanceText: "420m",
    rating: 4.6,
    lat: 37.5911,
    lng: 126.9971,
    imageUrl: images.coffee,
    openUntil: "22:00",
  },
];

const productTemplates: Array<{
  name: string;
  description: string;
  originalPrice: number;
  salePrice: number;
  discountRate: number;
  category: Product["category"];
  storageMethod: string;
  qualityNotice: string;
  imageUrl: string;
  storeIds: string[];
  isEvent?: boolean;
}> = [
  {
    name: "마감 빵 랜덤박스",
    description: "당일 생산된 빵을 랜덤으로 구성한 마감 할인 세트",
    originalPrice: 12000,
    salePrice: 5900,
    discountRate: 51,
    category: "bread",
    storageMethod: "상온 보관",
    qualityNotice: "당일 생산 상품이며 수령 후 빠른 섭취를 권장합니다.",
    imageUrl: images.bread,
    storeIds: ["s1", "s2"],
  },
  {
    name: "샌드위치 세트",
    description: "간단한 식사로 좋은 샌드위치와 미니 베이커리 구성",
    originalPrice: 9800,
    salePrice: 5400,
    discountRate: 45,
    category: "sandwich",
    storageMethod: "냉장 보관",
    qualityNotice: "신선식품으로 수령 후 당일 섭취를 권장합니다.",
    imageUrl: images.sandwich,
    storeIds: ["s1", "s2"],
  },
  {
    name: "조각 케이크 세트",
    description: "남은 조각 케이크 2개를 묶은 마감 할인 상품",
    originalPrice: 14000,
    salePrice: 7900,
    discountRate: 44,
    category: "cake",
    storageMethod: "냉장 보관",
    qualityNotice: "수령 후 냉장 보관하고 당일 섭취해주세요.",
    imageUrl: images.cake,
    storeIds: ["s8"],
  },
  {
    name: "디저트 모음 세트",
    description: "머핀, 도넛, 쿠키류를 랜덤으로 구성한 디저트 세트",
    originalPrice: 10000,
    salePrice: 4900,
    discountRate: 51,
    category: "dessert",
    storageMethod: "상온 보관",
    qualityNotice: "당일 판매 상품으로 빠른 섭취를 권장합니다.",
    imageUrl: images.dessert,
    storeIds: ["s8"],
  },
  {
    name: "아메리카노 마감 세트",
    description: "마감 전 남은 커피와 간단한 베이커리 구성",
    originalPrice: 8500,
    salePrice: 3900,
    discountRate: 54,
    category: "coffee",
    storageMethod: "즉시 섭취 권장",
    qualityNotice: "음료 상품은 수령 후 바로 섭취해주세요.",
    imageUrl: images.coffee,
    storeIds: ["s9"],
  },
  {
    name: "카페 음료 랜덤박스",
    description: "오늘 제조 가능한 음료를 할인 가격으로 제공하는 세트",
    originalPrice: 10000,
    salePrice: 4900,
    discountRate: 51,
    category: "drink",
    storageMethod: "냉장 보관",
    qualityNotice: "수령 후 빠른 섭취를 권장합니다.",
    imageUrl: images.drink,
    storeIds: ["s9"],
  },
  {
    name: "못난이 사과 1kg",
    description: "모양은 조금 다르지만 맛은 좋은 실속형 사과",
    originalPrice: 8900,
    salePrice: 4900,
    discountRate: 45,
    category: "fruit",
    storageMethod: "실온 또는 냉장 보관",
    qualityNotice: "외형 흠집이 있을 수 있으나 섭취에는 문제가 없습니다.",
    imageUrl: images.apple,
    storeIds: ["s3"],
  },
  {
    name: "제철 과일 랜덤박스",
    description: "당일 입고된 제철 과일을 실속 있게 구성한 박스",
    originalPrice: 15000,
    salePrice: 7900,
    discountRate: 47,
    category: "fruit",
    storageMethod: "냉장 보관",
    qualityNotice: "신선도 유지를 위해 빠른 수령을 권장합니다.",
    imageUrl: images.apple,
    storeIds: ["s3", "s7"],
  },
  {
    name: "오늘 수확 채소박스",
    description: "상추, 오이, 애호박 등 당일 입고 채소 랜덤 구성",
    originalPrice: 13000,
    salePrice: 6900,
    discountRate: 47,
    category: "vegetable",
    storageMethod: "냉장 보관",
    qualityNotice: "신선도 유지를 위해 빠른 수령을 권장합니다.",
    imageUrl: images.vegetable,
    storeIds: ["s4", "s7"],
  },
  {
    name: "쌈채소 실속 세트",
    description: "오늘 판매분 중 남은 쌈채소를 할인 구성한 세트",
    originalPrice: 7600,
    salePrice: 3900,
    discountRate: 49,
    category: "vegetable",
    storageMethod: "냉장 보관",
    qualityNotice: "잎채소 특성상 수령 후 빠른 섭취를 권장합니다.",
    imageUrl: images.vegetable,
    storeIds: ["s4"],
  },
  {
    name: "집밥 반찬 3종 세트",
    description: "당일 조리된 반찬 3가지를 묶은 할인 세트",
    originalPrice: 11000,
    salePrice: 5900,
    discountRate: 46,
    category: "sideDish",
    storageMethod: "냉장 보관",
    qualityNotice: "수령 후 냉장 보관하고 당일 섭취를 권장합니다.",
    imageUrl: images.sideDish,
    storeIds: ["s5"],
  },
  {
    name: "오늘의 반찬 랜덤박스",
    description: "마감 전 남은 인기 반찬을 랜덤으로 구성한 세트",
    originalPrice: 13000,
    salePrice: 6500,
    discountRate: 50,
    category: "sideDish",
    storageMethod: "냉장 보관",
    qualityNotice: "조리식품으로 수령 후 빠른 섭취를 권장합니다.",
    imageUrl: images.sideDish,
    storeIds: ["s5"],
  },
  {
    name: "든든 도시락 마감세트",
    description: "저녁 시간대 남은 도시락을 할인 판매하는 세트",
    originalPrice: 9500,
    salePrice: 4900,
    discountRate: 48,
    category: "lunchBox",
    storageMethod: "냉장 보관",
    qualityNotice: "조리식품으로 수령 후 빠른 섭취를 권장합니다.",
    imageUrl: images.lunchBox,
    storeIds: ["s6"],
  },
  {
    name: "간편식 한 끼 세트",
    description: "도시락과 간단한 사이드 메뉴를 함께 구성한 세트",
    originalPrice: 12000,
    salePrice: 6900,
    discountRate: 43,
    category: "meal",
    storageMethod: "냉장 보관",
    qualityNotice: "수령 후 전자레인지 조리 후 섭취해주세요.",
    imageUrl: images.lunchBox,
    storeIds: ["s6"],
  },
  {
    name: "오늘의 70% 특가박스",
    description: "매장별 남은 상품을 랜덤으로 구성한 초특가 세트",
    originalPrice: 15000,
    salePrice: 4500,
    discountRate: 70,
    category: "event",
    storageMethod: "상품별 상이",
    qualityNotice: "랜덤 구성 상품으로 교환 및 구성 변경이 어렵습니다.",
    imageUrl: images.dessert,
    storeIds: ["s1", "s3", "s5", "s6", "s9"],
    isEvent: true,
  },
];

export const mockProducts: Product[] = productTemplates.flatMap(
  (template, templateIndex) =>
    template.storeIds.map((storeId, storeIndex) => {
      const store = mockStores.find((item) => item.id === storeId);

      if (!store) {
        throw new Error(`Store not found: ${storeId}`);
      }

      const productNumber = templateIndex * 10 + storeIndex + 1;

      const pickupTimes = ["18:30", "19:00", "19:30", "20:00", "20:30"];
      const stockList = [2, 3, 5, 4, 6];
      const expiryDates = [
        "2026년 4월 28일",
        "2026년 4월 29일",
        "2026년 4월 30일",
        "2026년 5월 1일",
        "2026년 5월 2일",
      ];

      return {
        id: `p${productNumber}`,
        storeId: store.id,
        storeName: store.name,
        name: template.name,
        description: template.description,
        imageUrl: template.imageUrl,
        originalPrice: template.originalPrice + storeIndex * 300,
        salePrice: template.salePrice + storeIndex * 200,
        discountRate: template.discountRate,
        pickupTime: pickupTimes[(templateIndex + storeIndex) % pickupTimes.length],
        distance: store.distanceText,
        stock: stockList[(templateIndex + storeIndex) % stockList.length],
        storageMethod: template.storageMethod,
        qualityNotice: template.qualityNotice,
        rating: store.rating,
        address: store.address,
        lat: store.lat,
        lng: store.lng,
        category: template.category,
        expiryDate:
          expiryDates[(templateIndex + storeIndex) % expiryDates.length],
        isEvent: template.isEvent ?? false,
      };
    }),
);

export function getProductsByStoreId(storeId: string) {
  return mockProducts.filter((product) => product.storeId === storeId);
}

export function getStoreById(storeId: string) {
  return mockStores.find((store) => store.id === storeId);
}

export function getProductById(productId: string) {
  return mockProducts.find((product) => product.id === productId);
}