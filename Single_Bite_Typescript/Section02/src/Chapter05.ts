// enum type: 여러 가지 값들에 이름을 부여하는 열거형 타입

enum Role {
  ADMIN = 0,
  USER = 1,
  GUEST = 2,
}

enum Language {
  korean = "ko",
  english = "en",
}

const user1 = {
  name: "김유신",
  role: Role.ADMIN, // 관리자
  language: Language.english,
};
const user2 = {
  name: "안연우",
  role: Role.USER, // 일반 사용자
  language: Language.english,
};
const user3 = {
  name: "초코",
  role: Role.GUEST, // 게스트
  language: Language.korean,
};

console.log(user1, user2, user3);
