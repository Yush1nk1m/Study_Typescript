/**
 * Generic interface
 */
let keyPair = {
    key: "key",
    value: 0,
};
let keyPair2 = {
    key: true,
    value: ["1", "2", "3"],
};
let numberMap1 = {
    key: -1231,
    key2: 123123,
};
let stringMap = {
    key: "value",
};
let booleanMap = {
    key: true,
};
let stringMap2 = {
    key: "hello",
};
function goToSchool(user) {
    const school = user.profile.school;
    console.log(`${school}로 등교한다.`);
}
const developerUser = {
    name: "김유신",
    profile: {
        type: "developer",
        skill: "TypeScript",
    },
};
const studentUser = {
    name: "안연우",
    profile: {
        type: "student",
        school: "Sogang univ.",
    },
};
export {};
