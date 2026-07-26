import type { AnimalStatusLabel } from "@/entities/animal";

// Static mockup data — copy is verbatim from the 2a landing design.
// Swapped for real queries in a later phase.

export const HERO = {
  badge: "오늘도 322마리가 기다리고 있어요",
  title: ["좋은 만남은", "서두르지 않아요."],
  lead: "검증된 보호소의 아이들을 만나고, 마음을 담아 신청하세요. 새 가족이 되는 과정을 곁에서 함께 도울게요.",
  primary: "우리 가족 찾기",
  secondary: "임시보호 알아보기",
};

export const STATS = [
  { value: "1,840", label: "가족을 찾은 아이들" },
  { value: "96곳", label: "검증된 보호소" },
  { value: "4,200", label: "봉사 참여" },
];

export const ANIMAL_FILTERS = ["전체", "강아지", "고양이"];

export const ANIMALS: { name: string; status: AnimalStatusLabel; meta: string }[] = [
  { name: "콩이", status: "입양가능", meta: "강아지 · 2살 · 서울" },
  { name: "보리", status: "입양가능", meta: "고양이 · 1살 · 경기" },
  { name: "초코", status: "입양 진행중", meta: "강아지 · 4살 · 부산" },
  { name: "나비", status: "입양가능", meta: "고양이 · 3살 · 인천" },
];

export const STEPS = [
  { n: "1", title: "친구 찾기", desc: "종·지역·성향으로 나에게 맞는 아이를 만나요." },
  { n: "2", title: "신청·설문", desc: "보호소가 준비한 설문에 차분히 답하며 마음을 나눠요." },
  { n: "3", title: "만남·입양", desc: "보호소 승인 후, 새로운 가족이 되어요." },
];

export const CTA = {
  title: "오늘, 한 생명의 봄이 되어주세요",
  lead: "몇 번의 클릭이면 새 가족과 만나요",
  button: "우리 가족 만나러 가기",
};
