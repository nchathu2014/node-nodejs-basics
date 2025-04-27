import { readdir, stat } from "node:fs/promises";

const list = async () => {
  const filesDir = "src/fs/files";
  const failureMessage = "FS operation failed";

  try {
    // Check if the directory existance
    const stats = await stat(filesDir);
    if (!stats.isDirectory()) {
      throw new Error(failureMessage);
    }

    // Read the directory contents
    const filenames = await readdir(filesDir);
    console.log(filenames);
  } catch (error) {
    console.error(error.message);
  }
};

await list();
