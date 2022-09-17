const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

if (isMainThread) {
  const threads = new Set();
  threads.add(new Worker(__filename, { workerData: { start: 1 } }));
}
