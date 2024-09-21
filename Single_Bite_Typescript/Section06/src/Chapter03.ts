/**
 * 접근 제어자(Access modifier): public, protected, private
 */

class Employee {
  // field

  // constructor
  constructor(
    protected name: string,
    private age: number,
    public position: string
  ) {
    this.name = name;
    this.age = age;
    this.position = position;
  }

  // method
  work() {
    console.log(`${this.name}은 일한다.`);
  }
}

class ExecutiveOfficer extends Employee {
  // field
  officeNumber: number;

  // contrcutor
  constructor(
    name: string,
    age: number,
    position: string,
    officeNumber: number
  ) {
    super(name, age, position);
    this.officeNumber = officeNumber;
  }

  // method
  func() {
    this.name;
  }
}

const employee = new Employee("김유신", 24, "개발자");
// employee.name = "";
// employee.age = 0;
employee.position = "백엔드 개발자";

console.log(employee);
