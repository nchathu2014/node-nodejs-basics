import { createReadStream } from "node:fs";
import path from "node:path";
import { fileURLToPath } from 'node:url';

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, 'files', 'fileToRead.txt');
  
  // Create a readable stream for the target file
  const readableStream = createReadStream(filePath);

  readableStream.on("error", (error) => {
    console.error(`Error reading file: ${error.message}`);
  });
  
  readableStream.on("end", () => {
    console.log("\nFinished reading the file");
  });

  readableStream.pipe(process.stdout);
};

await read();