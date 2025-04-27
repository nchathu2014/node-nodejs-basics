import { readdir, unlink } from "node:fs/promises"; 
import path from "node:path";

const remove = async () => {
  const filesDir = "src/fs/files"; 
  const fileToDelete = "fileToRemove.txt";
  const pathToDelete = path.join(filesDir, fileToDelete);
  const failureMessage = "FS operation failed";

  try {
    const filesInDir = await readdir(filesDir);

    // Check if the file to delete exists in the directory
    if (!filesInDir.includes(fileToDelete)) {
      throw new Error(failureMessage);
    }

    // If the file exists, proceed to delete it
    await unlink(pathToDelete);
    console.log('File deleted successfully');

  } catch (error) {
    console.error(error.message);
  }
};

await remove();