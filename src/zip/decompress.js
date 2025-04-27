import path from "node:path";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from 'node:stream/promises';
import { createGunzip } from 'node:zlib';

const decompress = async () => {
  const basePath = "src/zip/files";
  const archiveFile = "archive.gz";
  const originalFile = "fileToCompress.txt";
  const archiveFilePath = path.join(basePath, archiveFile);
  const destinationFilePath = path.join(basePath, originalFile);

  // Create streams
  const readableStream = createReadStream(archiveFilePath);
  const gunzipStream = createGunzip();
  const writableStream = createWriteStream(destinationFilePath);

  try {
    // Use pipeline to connect the streams
    await pipeline(readableStream, gunzipStream, writableStream);
    console.log("File decompressed successfully.");
  } catch (error) {
    console.error("Decompression failed:", error);
  }
};

await decompress();