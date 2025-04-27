import { readdir } from "node:fs/promises";
import crypto from "node:crypto";
import path from "node:path";
import { createReadStream } from "node:fs";

const calculateHash = async () => {
  const basePath = "./src/hash/files";
  const fileName = "fileToCalculateHashFor.txt";
  const filePath = path.join(basePath, fileName);
  //Check the file existance
  try {
    const filesInDir = await readdir(basePath);
    if (!filesInDir.includes(fileName)) {
      throw new Error("fileToCalculateHash.txt not found");
    }
  } catch (error) {
    throw new Error(`Error reading directory: ${error.message}`);
  }

  console.log('chunk');
  //initiate read stream and hash calculation
  const readStream = createReadStream(filePath);
  const hash = crypto.createHash("sha256");

 // Listen for data events to update the hash
  readStream.on("data", (chunk) => {
    
    hash.update(chunk);
  });

  readStream.on("end", () => {
    const hashDigest = hash.digest("hex");
    console.log(hashDigest);
  });

  readStream.on("error", (error) => {
    throw new Error(`Error reading file: ${error.message}`);
  });
};

await calculateHash();
