import type { Product, Store } from "../types/product";

import bread1Image from "../assets/bread1.webp";
import bread2Image from "../assets/bread2.jpg";
import bread3Image from "../assets/bread3.jpg";

import bulgogiImage from "../assets/bulgogi.jpg";
import chickenImage from "../assets/chicken.png";
import meetImage from "../assets/meet.jpg";
import herbsImage from "../assets/herbs.webp";
import eggImage from "../assets/egg.jpg";
import balancedDietImage from "../assets/balanced-diet.png";
import kimchiImage from "../assets/kimchi.jpg";

import cakeImage from "../assets/cake.avif";
import donutImage from "../assets/donut.jpg";
import cookieImage from "../assets/cookie.jpg";
import tomatoImage from "../assets/tomato.jpg";
export const defaultUserLocation = {
  lat: 37.588227,
  lng: 126.993606,
  address: "서울 성북구 성북동",
};

const images = {
  creamBread: bread1Image,
  croissant: bread2Image,
  sandwich: bread3Image,

  jeyukLunchBox: meetImage,
  chickenLunchBox: chickenImage,
  bulgogiBowl: bulgogiImage,

  sideDish: balancedDietImage,
  kimchi: kimchiImage,
  namul: herbsImage,
  egg: eggImage,

  apple:
    "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=800&auto=format&fit=crop",
  potato:
    "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=800&auto=format&fit=crop",
  tomato: tomatoImage,
  lettuce:
    "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?q=80&w=800&auto=format&fit=crop",

  cake: cakeImage,
  donut: donutImage,
  cookie: cookieImage,
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
    imageUrl: images.creamBread,
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
    imageUrl: images.croissant,
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
    imageUrl: images.potato,
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
    imageUrl: images.jeyukLunchBox,
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
    imageUrl: images.tomato,
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
    imageUrl: images.donut,
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
  isRecommended?: boolean;
}> = [
  {
    name: "단팥 크림빵 2개",
    description: "당일 구운 단팥 크림빵을 마감 할인 가격으로 판매합니다.",
    originalPrice: 7600,
    salePrice: 3900,
    discountRate: 49,
    category: "bread",
    storageMethod: "상온 보관",
    qualityNotice: "당일 생산 상품이며 수령 후 빠른 섭취를 권장합니다.",
    imageUrl: images.creamBread,
    storeIds: ["s1"],
    isRecommended: true,
  },
  {
    name: "버터 크루아상 3개",
    description: "겹겹이 바삭한 크루아상 3개 구성입니다.",
    originalPrice: 9600,
    salePrice: 5200,
    discountRate: 46,
    category: "bread",
    storageMethod: "상온 보관",
    qualityNotice: "당일 생산 상품이며 수령 후 빠른 섭취를 권장합니다.",
    imageUrl: images.croissant,
    storeIds: ["s2"],
  },
  {
    name: "햄치즈 샌드위치",
    description: "햄, 치즈, 신선한 채소가 들어간 든든한 샌드위치입니다.",
    originalPrice: 6800,
    salePrice: 3900,
    discountRate: 43,
    category: "sandwich",
    storageMethod: "냉장 보관",
    qualityNotice: "신선식품으로 수령 후 당일 섭취를 권장합니다.",
    imageUrl: images.sandwich,
    storeIds: ["s1", "s2"],
  },

  {
    name: "제육볶음 도시락",
    description: "매콤한 제육볶음과 밥, 기본 반찬이 함께 담긴 도시락입니다.",
    originalPrice: 8900,
    salePrice: 5200,
    discountRate: 42,
    category: "lunchBox",
    storageMethod: "냉장 보관",
    qualityNotice: "조리식품으로 수령 후 빠른 섭취를 권장합니다.",
    imageUrl: images.jeyukLunchBox,
    storeIds: ["s6"],
    isRecommended: true,
  },
  {
    name: "치킨마요 도시락",
    description: "치킨, 마요소스, 밥이 어우러진 간편 한 끼 도시락입니다.",
    originalPrice: 8200,
    salePrice: 4900,
    discountRate: 40,
    category: "lunchBox",
    storageMethod: "냉장 보관",
    qualityNotice: "수령 후 전자레인지 조리 후 섭취해주세요.",
    imageUrl: images.chickenLunchBox,
    storeIds: ["s6"],
  },
  {
    name: "불고기 도시락",
    description: "달짝지근한 불고기와 밥을 함께 담은 든든한 도시락입니다.",
    originalPrice: 9200,
    salePrice: 5600,
    discountRate: 39,
    category: "meal",
    storageMethod: "냉장 보관",
    qualityNotice: "수령 후 전자레인지 조리 후 섭취해주세요.",
    imageUrl: images.bulgogiBowl,
    storeIds: ["s6"],
  },

  {
    name: "계란말이 반찬",
    description: "당일 조리한 부드러운 계란말이 반찬입니다.",
    originalPrice: 5500,
    salePrice: 3200,
    discountRate: 42,
    category: "sideDish",
    storageMethod: "냉장 보관",
    qualityNotice: "수령 후 냉장 보관하고 당일 섭취를 권장합니다.",
    imageUrl: images.egg,
    storeIds: ["s5"],
  },
  {
    name: "볶음김치 반찬",
    description: "밥반찬으로 먹기 좋은 매콤한 볶음김치입니다.",
    originalPrice: 6200,
    salePrice: 3500,
    discountRate: 44,
    category: "sideDish",
    storageMethod: "냉장 보관",
    qualityNotice: "조리식품으로 수령 후 빠른 섭취를 권장합니다.",
    imageUrl: images.kimchi,
    storeIds: ["s5"],
  },
  {
    name: "나물 반찬 2종",
    description: "당일 무친 나물 반찬 2가지를 소량 구성으로 제공합니다.",
    originalPrice: 7400,
    salePrice: 3900,
    discountRate: 47,
    category: "sideDish",
    storageMethod: "냉장 보관",
    qualityNotice: "수령 후 냉장 보관하고 당일 섭취를 권장합니다.",
    imageUrl: images.namul,
    storeIds: ["s5"],
  },

  {
    name: "못난이 사과 1kg",
    description: "모양은 조금 다르지만 맛은 좋은 실속형 사과입니다.",
    originalPrice: 8900,
    salePrice: 4900,
    discountRate: 45,
    category: "fruit",
    storageMethod: "실온 또는 냉장 보관",
    qualityNotice: "외형 흠집이 있을 수 있으나 섭취에는 문제가 없습니다.",
    imageUrl: images.apple,
    storeIds: ["s3"],
    isRecommended: true,
  },
  {
    name: "햇감자 1.5kg",
    description: "조림, 볶음, 찜 요리에 활용하기 좋은 신선한 감자입니다.",
    originalPrice: 7900,
    salePrice: 4300,
    discountRate: 46,
    category: "vegetable",
    storageMethod: "서늘한 곳 보관",
    qualityNotice: "일부 크기 차이나 흙 묻음이 있을 수 있습니다.",
    imageUrl: images.potato,
    storeIds: ["s4", "s7"],
  },
  {
    name: "방울토마토 500g",
    description: "간식이나 샐러드에 곁들이기 좋은 방울토마토입니다.",
    originalPrice: 6900,
    salePrice: 3900,
    discountRate: 43,
    category: "fruit",
    storageMethod: "냉장 보관",
    qualityNotice: "신선도 유지를 위해 빠른 수령을 권장합니다.",
    imageUrl: images.tomato,
    storeIds: ["s3", "s7"],
  },
  {
    name: "상추 한 봉지",
    description: "쌈이나 샐러드로 먹기 좋은 신선한 상추입니다.",
    originalPrice: 4200,
    salePrice: 2500,
    discountRate: 40,
    category: "vegetable",
    storageMethod: "냉장 보관",
    qualityNotice: "잎채소 특성상 수령 후 빠른 섭취를 권장합니다.",
    imageUrl: images.lettuce,
    storeIds: ["s4"],
  },

  {
    name: "딸기 생크림 조각케이크",
    description: "부드러운 생크림과 딸기가 올라간 조각케이크입니다.",
    originalPrice: 7200,
    salePrice: 4200,
    discountRate: 42,
    category: "cake",
    storageMethod: "냉장 보관",
    qualityNotice: "수령 후 냉장 보관하고 당일 섭취해주세요.",
    imageUrl: images.cake,
    storeIds: ["s8"],
  },
  {
    name: "초코 도넛 2개",
    description: "초코 코팅이 올라간 달콤한 도넛 2개 구성입니다.",
    originalPrice: 6400,
    salePrice: 3500,
    discountRate: 45,
    category: "dessert",
    storageMethod: "상온 보관",
    qualityNotice: "당일 판매 상품으로 빠른 섭취를 권장합니다.",
    imageUrl: images.donut,
    storeIds: ["s8"],
  },
  {
    name: "수제 쿠키 4개",
    description: "바삭한 수제 쿠키 4개를 마감 할인으로 제공합니다.",
    originalPrice: 7200,
    salePrice: 3900,
    discountRate: 46,
    category: "dessert",
    storageMethod: "상온 보관",
    qualityNotice: "당일 판매 상품으로 빠른 섭취를 권장합니다.",
    imageUrl: images.cookie,
    storeIds: ["s8"],
  },

  {
    name: "오늘의 마감 특가 상품",
    description: "오늘 가장 할인율이 높은 상품을 한정 수량으로 제공합니다.",
    originalPrice: 10000,
    salePrice: 4900,
    discountRate: 51,
    category: "event",
    storageMethod: "상품별 상이",
    qualityNotice: "마감 할인 상품으로 수령 후 빠른 섭취를 권장합니다.",
    imageUrl: images.creamBread,
    storeIds: ["s1", "s5", "s6", "s8"],
    isEvent: true,
    isRecommended: true,
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
        "2026년 5월 13일",
        "2026년 5월 14일",
        "2026년 5월 15일",
        "2026년 5월 16일",
        "2026년 5월 17일",
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
        isRecommended: template.isRecommended ?? false,
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