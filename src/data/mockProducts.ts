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

import tomatoImage from "../assets/tomato.jpg";
import pigImage from "../assets/pig.png";
import cowImage from "../assets/cow.png";

export const defaultUserLocation = {
  lat: 37.5868,
  lng: 127.002,
  address: "서울 종로구 혜화로 8길 15",
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

  pig: pigImage,
  cow: cowImage,
};

export const mockStores: Store[] = [
  {
    id: "s1",
    name: "파리바게뜨 혜화점",
    brand: "파리바게뜨",
    address: "서울 종로구 혜화로 12",
    distance: 0.12,
    distanceText: "120m",
    rating: 4.7,
    lat: 37.5875,
    lng: 127.0008,
    imageUrl: images.creamBread,
    openUntil: "22:00",
  },
  {
    id: "s2",
    name: "뚜레쥬르 대학로점",
    brand: "뚜레쥬르",
    address: "서울 종로구 대학로 116",
    distance: 0.2,
    distanceText: "200m",
    rating: 4.6,
    lat: 37.5852,
    lng: 127.0031,
    imageUrl: images.croissant,
    openUntil: "21:30",
  },
  {
    id: "s3",
    name: "혜화 과일가게",
    brand: "지역농산물",
    address: "서울 종로구 혜화로 5길 8",
    distance: 0.15,
    distanceText: "150m",
    rating: 4.8,
    lat: 37.5872,
    lng: 127.0035,
    imageUrl: images.apple,
    openUntil: "20:00",
  },
  {
    id: "s4",
    name: "대학로 신선마켓",
    brand: "로컬마켓",
    address: "서울 종로구 대학로 128",
    distance: 0.25,
    distanceText: "250m",
    rating: 4.5,
    lat: 37.5861,
    lng: 127.0043,
    imageUrl: images.potato,
    openUntil: "21:00",
  },
  {
    id: "s5",
    name: "엄마손 반찬 혜화점",
    brand: "반찬가게",
    address: "서울 종로구 혜화로 10길 3",
    distance: 0.18,
    distanceText: "180m",
    rating: 4.6,
    lat: 37.5879,
    lng: 127.0025,
    imageUrl: images.sideDish,
    openUntil: "20:30",
  },
  {
    id: "s6",
    name: "든든도시락 혜화점",
    brand: "도시락",
    address: "서울 종로구 대학로 12길 17",
    distance: 0.3,
    distanceText: "300m",
    rating: 4.4,
    lat: 37.5845,
    lng: 127.0018,
    imageUrl: images.jeyukLunchBox,
    openUntil: "21:00",
  },
  {
    id: "s7",
    name: "혜화 로컬푸드 마켓",
    brand: "로컬푸드",
    address: "서울 종로구 창경궁로 254",
    distance: 0.4,
    distanceText: "400m",
    rating: 4.5,
    lat: 37.5888,
    lng: 127.0048,
    imageUrl: images.tomato,
    openUntil: "21:00",
  },
  {
    id: "s8",
    name: "혜화 정육마켓",
    brand: "정육",
    address: "서울 종로구 동숭길 40",
    distance: 0.35,
    distanceText: "350m",
    rating: 4.7,
    lat: 37.5855,
    lng: 127.0005,
    imageUrl: images.pig,
    openUntil: "22:00",
  },
];

const pickupProductTemplates: Array<{
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
    name: "삼겹살",
    description:
      "구이용으로 먹기 좋은 신선한 삼겹살을 마감 할인 가격으로 판매합니다.",
    originalPrice: 15800,
    salePrice: 9900,
    discountRate: 37,
    category: "meat",
    storageMethod: "냉장 보관",
    qualityNotice: "신선식품으로 수령 후 냉장 보관하고 빠른 섭취를 권장합니다.",
    imageUrl: images.pig,
    storeIds: ["s8"],
    isRecommended: true,
  },
  {
    name: "소고기 모둠 세트",
    description: "구이와 볶음 요리에 활용하기 좋은 소고기 모둠 세트입니다.",
    originalPrice: 24800,
    salePrice: 16900,
    discountRate: 32,
    category: "meat",
    storageMethod: "냉장 보관",
    qualityNotice: "신선식품으로 수령 후 냉장 보관하고 빠른 섭취를 권장합니다.",
    imageUrl: images.cow,
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

export const mockProducts: Product[] = pickupProductTemplates.flatMap(
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
        pickupTime:
          pickupTimes[(templateIndex + storeIndex) % pickupTimes.length],
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
        deliveryType: "pickup",
      };
    }),
);

export const mockDeliveryProducts: Product[] = [
  {
    id: "d1",
    storeId: "delivery-farm-yeongju",
    storeName: "영주 소백산 농산물센터",
    name: "영주 사과 못난이 박스 2kg",
    description:
      "모양은 조금 다르지만 당도 좋은 영주 사과를 산지에서 바로 보내드리는 배송특가 상품입니다.",
    imageUrl: images.apple,
    originalPrice: 19800,
    salePrice: 9900,
    discountRate: 50,
    pickupTime: "내일 새벽 도착",
    distance: "배송",
    stock: 12,
    storageMethod: "서늘한 곳 또는 냉장 보관",
    qualityNotice: "외형 흠집이 있을 수 있으나 섭취에는 문제가 없습니다.",
    rating: 4.9,
    address: "경북 영주시 풍기읍",
    lat: 36.8706,
    lng: 128.5246,
    category: "fruit",
    expiryDate: "2026년 5월 20일",
    isRecommended: true,
    isEvent: false,
    deliveryType: "delivery",
  },
  {
    id: "d2",
    storeId: "delivery-farm-yeongju",
    storeName: "영주 소백산 농산물센터",
    name: "영주 방울토마토 1kg",
    description: "간식이나 샐러드에 곁들이기 좋은 산지 직송 방울토마토입니다.",
    imageUrl: images.tomato,
    originalPrice: 15800,
    salePrice: 7900,
    discountRate: 50,
    pickupTime: "내일 새벽 도착",
    distance: "배송",
    stock: 10,
    storageMethod: "냉장 보관",
    qualityNotice: "신선도 유지를 위해 수령 후 빠른 섭취를 권장합니다.",
    rating: 4.8,
    address: "경북 영주시 안정면",
    lat: 36.8263,
    lng: 128.5652,
    category: "fruit",
    expiryDate: "2026년 5월 18일",
    isRecommended: true,
    isEvent: false,
    deliveryType: "delivery",
  },
  {
    id: "d3",
    storeId: "delivery-farm-andong",
    storeName: "안동 로컬푸드 산지센터",
    name: "안동 햇감자 3kg",
    description:
      "조림, 볶음, 찜 요리에 활용하기 좋은 안동 햇감자 산지 배송 상품입니다.",
    imageUrl: images.potato,
    originalPrice: 16900,
    salePrice: 8900,
    discountRate: 47,
    pickupTime: "내일 새벽 도착",
    distance: "배송",
    stock: 15,
    storageMethod: "직사광선을 피해 서늘한 곳 보관",
    qualityNotice: "일부 크기 차이나 흙 묻음이 있을 수 있습니다.",
    rating: 4.7,
    address: "경북 안동시 풍산읍",
    lat: 36.6151,
    lng: 128.5729,
    category: "vegetable",
    expiryDate: "2026년 5월 24일",
    isRecommended: false,
    isEvent: false,
    deliveryType: "delivery",
  },
  {
    id: "d4",
    storeId: "delivery-farm-andong",
    storeName: "안동 로컬푸드 산지센터",
    name: "안동 쌈채소 모둠팩",
    description:
      "상추, 깻잎 등 쌈채소를 소포장으로 구성한 신선 농산물 배송팩입니다.",
    imageUrl: images.lettuce,
    originalPrice: 12800,
    salePrice: 6900,
    discountRate: 46,
    pickupTime: "내일 새벽 도착",
    distance: "배송",
    stock: 8,
    storageMethod: "냉장 보관",
    qualityNotice: "잎채소 특성상 수령 후 빠른 섭취를 권장합니다.",
    rating: 4.6,
    address: "경북 안동시 와룡면",
    lat: 36.6538,
    lng: 128.7715,
    category: "vegetable",
    expiryDate: "2026년 5월 17일",
    isRecommended: false,
    isEvent: false,
    deliveryType: "delivery",
  },
  {
    id: "d5",
    storeId: "delivery-farm-jeju",
    storeName: "제주 산지직송 마켓",
    name: "제주 미니 토마토 박스",
    description:
      "제주 농가에서 선별한 미니 토마토를 신선하게 보내드리는 배송 상품입니다.",
    imageUrl: images.tomato,
    originalPrice: 18800,
    salePrice: 9900,
    discountRate: 47,
    pickupTime: "모레 도착 예정",
    distance: "배송",
    stock: 9,
    storageMethod: "냉장 보관",
    qualityNotice: "수령 후 냉장 보관하고 빠르게 섭취해주세요.",
    rating: 4.8,
    address: "제주특별자치도 제주시 애월읍",
    lat: 33.4624,
    lng: 126.3314,
    category: "fruit",
    expiryDate: "2026년 5월 19일",
    isRecommended: true,
    isEvent: false,
    deliveryType: "delivery",
  },
  {
    id: "d6",
    storeId: "delivery-farm-jeju",
    storeName: "제주 산지직송 마켓",
    name: "제주 신선 채소 꾸러미",
    description:
      "제주산 잎채소와 제철 채소를 랜덤 구성한 산지 배송 꾸러미입니다.",
    imageUrl: images.lettuce,
    originalPrice: 21800,
    salePrice: 11900,
    discountRate: 45,
    pickupTime: "모레 도착 예정",
    distance: "배송",
    stock: 7,
    storageMethod: "냉장 보관",
    qualityNotice: "구성 품목은 산지 상황에 따라 일부 달라질 수 있습니다.",
    rating: 4.7,
    address: "제주특별자치도 서귀포시 남원읍",
    lat: 33.2799,
    lng: 126.7206,
    category: "vegetable",
    expiryDate: "2026년 5월 18일",
    isRecommended: true,
    isEvent: false,
    deliveryType: "delivery",
  },
  {
    id: "d7",
    storeId: "delivery-farm-gangneung",
    storeName: "강릉 로컬팜 배송센터",
    name: "강릉 감자 실속 박스 2kg",
    description:
      "강릉 산지에서 출고되는 감자 실속 박스입니다. 크기 혼합 구성입니다.",
    imageUrl: images.potato,
    originalPrice: 14900,
    salePrice: 7900,
    discountRate: 47,
    pickupTime: "내일 도착 예정",
    distance: "배송",
    stock: 11,
    storageMethod: "서늘하고 통풍이 잘 되는 곳 보관",
    qualityNotice: "크기와 모양이 균일하지 않을 수 있습니다.",
    rating: 4.6,
    address: "강원 강릉시 왕산면",
    lat: 37.6659,
    lng: 128.8378,
    category: "vegetable",
    expiryDate: "2026년 5월 23일",
    isRecommended: false,
    isEvent: false,
    deliveryType: "delivery",
  },
  {
    id: "d8",
    storeId: "delivery-farm-nonsan",
    storeName: "논산 신선농산물센터",
    name: "논산 방울토마토 특가팩",
    description:
      "논산 농가에서 수확한 방울토마토를 합리적인 가격으로 보내드립니다.",
    imageUrl: images.tomato,
    originalPrice: 16200,
    salePrice: 8500,
    discountRate: 48,
    pickupTime: "내일 도착 예정",
    distance: "배송",
    stock: 13,
    storageMethod: "냉장 보관",
    qualityNotice: "배송 후 빠른 섭취를 권장합니다.",
    rating: 4.8,
    address: "충남 논산시 연무읍",
    lat: 36.1294,
    lng: 127.1001,
    category: "fruit",
    expiryDate: "2026년 5월 18일",
    isRecommended: false,
    isEvent: false,
    deliveryType: "delivery",
  },
];

export const allMockProducts: Product[] = [
  ...mockProducts,
  ...mockDeliveryProducts,
];

export function getProductsByStoreId(storeId: string) {
  return mockProducts.filter((product) => product.storeId === storeId);
}

export function getStoreById(storeId: string) {
  return mockStores.find((store) => store.id === storeId);
}

export function getProductById(productId: string) {
  return mockProducts.find((product) => product.id === productId);
}

export function getDeliveryProductById(productId: string) {
  return mockDeliveryProducts.find((product) => product.id === productId);
}

export function getAnyProductById(productId: string) {
  return allMockProducts.find((product) => product.id === productId);
}
