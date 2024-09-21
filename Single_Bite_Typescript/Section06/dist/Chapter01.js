/**
 * 클래스
 */
let studentA = {
    name: "김유신",
    grade: "A+",
    age: 24,
    study() {
        console.log("공부한다.");
    },
    introduce() {
        console.log("안녕하세요.");
    },
};
class Student {
    // field
    name;
    grade;
    age;
    // constructor
    constructor(name, grade, age) {
        this.name = name;
        this.grade = grade;
        this.age = age;
    }
    // method
    study() {
        console.log("공부한다.");
    }
    introduce() {
        console.log(`안녕하세요. ${this.name}입니다.`);
    }
}
class StudentDeveloper extends Student {
    // field
    favoriteSkill;
    // constructor
    constructor(name, grade, age, favoriteSkill) {
        super(name, grade, age);
        this.favoriteSkill = favoriteSkill;
    }
    // method
    programming() {
        console.log(`${this.favoriteSkill}로 프로그래밍한다.`);
    }
}
// 인스턴스 생성
let studentB = new Student("안연우", "A+", 23);
console.log(studentB);
studentB.study();
studentB.introduce();
const studentDeveloper = new StudentDeveloper("김유신", "A+", 24, "C++");
studentDeveloper.programming();
export {};
