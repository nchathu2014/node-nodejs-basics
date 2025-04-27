
import { rename as fsRename, stat, readdir } from "node:fs/promises";
import path from 'node:path';

const rename = async () => {
  const filesDir = "src/fs/files";
  const oldFilename = "wrongFilename.txt";
  const newFilename = "properFilename.md";
  const oldFilePath = path.join(filesDir, oldFilename);
  const newFilePath = path.join(filesDir, newFilename);
  const failureMessage = "FS operation failed";

  try {
    // Check 1: Ensure oldFilename exists within filesDir 
    const filesInDir = await readdir(filesDir);
    if (!filesInDir.includes(oldFilename)) {
        throw new Error(failureMessage);
    }

    // Check 2: Ensure newFilePath does NOT exist 
    try {
      await stat(newFilePath);
      // If stat succeeds, the new file already exists
      throw new Error(failureMessage);
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }

    // If both checks passed, perform the rename operation
    await fsRename(oldFilePath, newFilePath);
    console.log("File renamed successfully");

  } catch (error) {
      console.error(error.message);
  }
};

await rename();