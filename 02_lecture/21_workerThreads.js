const { Worker, isMainThread, parentPort } = require("worker_threads");

if (isMainThread) {
  const worker = new Worker(__filename);
  worker.on("message", (message) => {
    console.log("from worker", message);  // from parent ping
  });
  worker.on("exit", () => console.log("worker exit"));  // worker exit
  worker.postMessage("ping");
} else {
  parentPort.on("message", (value) => {
    console.log("from parent", value);  // from worker pong
    parentPort.postMessage("pong");
    parentPort.close();
  });
}
