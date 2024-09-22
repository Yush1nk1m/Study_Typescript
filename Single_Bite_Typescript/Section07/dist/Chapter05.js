/**
 * Generic class
 */
class NumberList {
    list;
    constructor(list) {
        this.list = list;
    }
    push(data) {
        this.list.push(data);
    }
    pop() {
        return this.list.pop();
    }
    print() {
        console.log(this.list);
    }
}
const numberList = new NumberList([1, 2, 3]);
numberList.pop();
numberList.push(4);
numberList.print();
export {};
