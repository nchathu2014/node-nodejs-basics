import { parentPort, workerData } from "node:worker_threads";

// n should be received from main thread
const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  try {
    // Get the input value from workerData
    const n = workerData;

    if (typeof n !== "number") {
      throw new Error("Invalid input: expected a number");
    }

    const result = nthFibonacci(n);

    // Send the result back to the main thread
    parentPort.postMessage(result);
  } catch (error) {
    parentPort.postMessage({ error: error.message });
  }
};

sendResult();
