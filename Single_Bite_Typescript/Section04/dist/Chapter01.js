/**
 * 함수 타입 정의
 */
function func(a, b) {
    return a + b;
}
/**
 * 화살표 함수의 타입 정의
 */
const add = (a, b) => a + b;
/**
 * 함수의 매개변수
 */
function introduce(name = "김유신", tall) {
    console.log(`name: ${name}`);
    if (typeof tall === "number") {
        console.log(`tall: ${tall + 10}`);
    }
}
introduce("김유신");
introduce("김유신", 165);
export {};
