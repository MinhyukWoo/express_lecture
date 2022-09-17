function run() {
    console.log("3초 후 실행");
}
console.log("시작");
setTimeout(run, 3000);
console.log("끝");

// 호출 스택만으로는 설명 불가
// 이벤트 호출을 이해해야 한다.