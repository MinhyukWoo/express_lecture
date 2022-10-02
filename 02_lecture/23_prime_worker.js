const {
  isMainThread,
  Worker,
  workerData,
  parentPort,
} = require("worker_threads"); // 모듈 worker threads를 임포트한다.

const min = 2;
// 소수를 저장할 배열 primes 선언한다.
// 메인 스레드와 각각의 워커 스레드에서 배열 primes는 다르게 동작된다.
let primes = [];

// 소수를 배열 primes에 넣는 함수 findPrimes를 정의한다.
function findPrimes(start, range) {
  let isPrime = true;
  const end = start + range;
  for (let i = start; i < end; i++) {
    // j를 min부터 end의 제곱근까지 순회한다.
    for (let j = min; j < Math.sqrt(end); j++) {
      // i를 j로 나눌 때 나머지가 0인데 두 값이 다르다면 isPrime을 false로 하고 탈출한다.
      if (i !== j && i % j === 0) {
        isPrime = false;
        break;
      }
    }
    // j를 순회하고 나서 i가 소수이면 배열 primes에 i를 넣는다.
    if (isPrime) {
      primes.push(i);
    }
    // 다시 isPrime을 true로 초기화 한다.
    isPrime = true;
  }
}

if (isMainThread) {
  // 메인 스레드면 이 코드 블럭을 실행한다.
  const max = 10000000;
  // 사용할 Worker의 개수를 threadCount로 선언한다.
  const threadCount = 8;
  // 여러 Worker을 보관할 배열 threads를 선언한다.
  const threads = new Set();
  // 마지막 Worker을 제외한 나머지 Worker들이 탐색할 숫자 범위를 range로 선언한다.
  const range = Math.ceil((max - min) / threadCount);
  let start = min;
  // 시간 측정을 시작한다.
  console.time("prime");
  // threadCount - 1만큼 반복한다.
  for (let i = 0; i < threadCount - 1; i++) {
    // start와 range를 갖는 객체를 workerData에 전달하여 생성한 Worker을 threads에 넣는다.
    const wStart = start;
    threads.add(
      new Worker(__filename, { workerData: { start: wStart, range } })
    );
    // 다음 start를 기존 start에 range를 더한 값으로 설정한다.
    start += range;
  }
  // 마지막 범위(마지막 start에서 끝까지)에 대하여 Worker을 생성하여 threads에 넣는다.
  threads.add(
    new Worker(__filename, {
      workerData: {
        start: start,
        range: range + ((max - min + 1) % threadCount),
      },
    })
  );
  // threads에 있는 worker를 순회한다.
  for (let worker of threads) {
    // 워커 스레드에서 잡히지 않은 예외가 발생하면 throw하도록 error 이벤트에 등록한다.
    worker.on("error", (err) => {
      throw err;
    });
    // 워커 스레드가 종료될 때 실행할 화살표 함수를 exit 이벤트에 등록한다.
    worker.on("exit", () => {
      threads.delete(worker);
      if (threads.size === 0) {
        // 시간 측정을 종료하고 걸린 시간을 로그로 출력한다.
        console.timeEnd("prime");
        // primes에 넣은 소수의 개수를 로그로 출력한다.
        console.log(primes.length);
      }
    });
    // 워커 스레드에서 message로 전달한 배열을 메인 스레드의 배열 primes과 연결시킨다.
    worker.on("message", (message) => {
      primes = primes.concat(message);
    });
  }
} else {
  // 워커 스레드면 이 코드 블럭을 실행한다.
  // workData로 전달받은 범위로 소수를 찾는다.
  findPrimes(workerData.start, workerData.range);
  // 워커 스레드의 배열 primes을 postMessage로 부모 스레드에 전달한다.
  parentPort.postMessage(primes);
}
