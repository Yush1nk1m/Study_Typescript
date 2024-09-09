// type alias
type User = {
  id: number;
  name: string;
  nickname: string;
  birth: string;
  bio: string;
  location: string;
};

function func() {
  type User = {};
}

let user: User = {
  id: 1,
  name: "김유신",
  nickname: "유신",
  birth: "2001.03.06",
  bio: "안녕하세요",
  location: "군포시",
};

let user2: User = {
  id: 2,
  name: "초코",
  nickname: "촠",
  birth: "2001.03.06",
  bio: "안녕하세요",
  location: "군포시",
};

// index signature
type CountryCodes = {
  [key: string]: string;
};

let countryCodes: CountryCodes = {
  Korea: "ko",
  UnitedStates: "us",
  UnitedKingdom: "uk",
};

type CountryNumberCodes = {
  [key: string]: number;
  Korea: number;
};

let countryNumberCodes: CountryNumberCodes = {
  Korea: 410,
  UnitedStates: 840,
  UnitedKingdom: 826,
};

// let emptyCodes: CountryNumberCodes = {};
