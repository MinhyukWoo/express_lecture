const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads"); // 모듈 worker threads를 import한다.

if (isMainThread) {
  // 메인 스레드면 이 코드 블럭을 실행한다.
  // 여러 Worker를 보관하기 위한 Set 선언한다.
  const threads = new Set();
  // Worker를 생성하여 threads에 넣는다.
  // __filename으로 워커 스레드를 실행하는 파일을 현재 파일로 지정한다.
  // option에 workerData에 start 키워드를 갖고 있는 객체를 전달한다.
  threads.add(new Worker(__filename, { workerData: { start: 1 } }));
  threads.add(new Worker(__filename, { workerData: { start: 2 } }));
  // 여러 worker가 있는 threads를 순회한다.
  for (const worker of threads) {
    // 로그를 출력하는 화살표 함수를 worker의 message 이벤트에 등록한다.
    worker.on("message", (message) => console.log("from worker", message));
    // worker의 exit 이벤트에 등록한다.
    worker.on("exit", () => {
      // threads에 해당 worker을 삭제한다.
      threads.delete(worker);
      // threads가 비어있으면 로그를 출력한다.
      if (threads.size == 0) {
        console.log("job done");
      }
    });
  }
} else {
  // 워커 스레드면 이 코드 블럭을 실행한다.
  // Worker을 생성할 때 workerData에 전달된 값을 불러온다.
  const data = workerData;
  // 부모 스레드의 MessagePort로 기존 start 값에 100을 더하여 메시지를 보낸다.
  parentPort.postMessage(data.start + 100);
}
