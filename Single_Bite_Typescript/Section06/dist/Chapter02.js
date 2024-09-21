/**
 * 타입스크립트의 클래스
 */
const employee = {
    name: "김유신",
    age: 24,
    position: "Backend developer",
    work() {
        console.log("일한다.");
    },
};
class Employee {
    // field
    name;
    age;
    position;
    // constructor
    constructor(name, age, position) {
        this.name = name;
        this.age = age;
        this.position = position;
    }
    // method
    work() {
        console.log("일한다.");
    }
}
class ExecutiveOfficer extends Employee {
    // field
    officeNumber;
    // contrcutor
    constructor(name, age, position, officeNumber) {
        super(name, age, position);
        this.officeNumber = officeNumber;
    }
}
const employeeB = new Employee("김유신", 24, "개발자");
console.log(employeeB);
const employeeC = {
    name: "",
    age: 0,
    position: "",
    work() { },
};
export {};
