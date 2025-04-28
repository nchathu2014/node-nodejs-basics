import { fork } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spawnChildProcess = async (args) => {
  const scriptPath = path.resolve(__dirname, "files", "script.js");
  console.log(`[Parent] Attempting to fork script at: ${scriptPath}`);

  try {
    const child = fork(scriptPath, args || [], {
      stdio: ["pipe", "pipe", "pipe", "ipc"], //stdin, stdout, stderr, ipc
    });

    child.on("error", (err) => {
      console.error("[Parent] Error spawning/in child process:", err);
    });

    child.stdout.on("data", (data) => {
      console.log("[Parent] Received stdout from child:");
      process.stdout.write(data);
    });

    child.stderr.on("data", (data) => {
      console.error("[Parent] Received stderr from child:");
      process.stderr.write(data);
    });

    process.stdin.pipe(child.stdin);

    process.stdin.on("end", () => {
      console.log("[Parent] stdin ended.");
    });

    child.on("close", (code, signal) => {
      console.log(
        `\n[Parent] Child process closed with code ${code}, signal ${signal}`
      );

      try {
        process.stdin.unpipe(child.stdin);
      } catch (e) {}
    });

    child.on("exit", (code, signal) => {
      console.log(
        `\n[Parent] Child process exited with code ${code}, signal ${signal}`
      );
    });

    return child;
  } catch (error) {
    console.error("[Parent] Error during fork setup:", error);
  }
};

// Example usage
spawnChildProcess(["arg1", "arg2", "Hello World"]);
