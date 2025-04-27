import { createReadStream } from "node:fs";

const read = async () => {
  // Create a readable stream for the target file
  const readableStream = createReadStream("src/streams/files/fileToRead.txt");

  readableStream.on("error", (error) => {
    console.error(`Error reading file: ${error.message}`);
  });

  // Pipe the data from the readable stream directly to the standard output stream
  readableStream.pipe(process.stdout);
};

await read();
