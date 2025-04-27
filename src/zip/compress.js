import path from "node:path";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';

const compress = async () => {
  const basePath = "src/zip/files";
  const toCompressFile = "fileToCompress.txt";
  const fileToCompressPath = path.join(basePath, toCompressFile);
  const destinationFilePath = path.join(basePath, "archive.gz");

  //Create streams
  const readableStream = createReadStream(fileToCompressPath);
  const gzipStream = createGzip();
  const writableStream = createWriteStream(destinationFilePath);

  try {
    // Use pipeline to connect the streams
    await pipeline(readableStream, gzipStream, writableStream);
    console.log("File compressed successfully.");
  } catch (error) {
    console.error("Compression failed:", error);
  }
};

await compress();
