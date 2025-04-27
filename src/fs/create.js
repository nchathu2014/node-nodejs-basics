import fs from "node:fs/promises";

const create = async () => {
  const fileName = "fresh.txt";
  const basePath = "src/fs/files";

  try {
    const files = await fs.readdir(basePath);
    const isFileExists = files.includes(fileName);

    if (files.length === 0) {
      console.error("No Files in directory");
      return;
    }
    
    if (isFileExists) {
      console.error("FS operation failed");
      return;
    }

    try {
      await fs.writeFile(`${basePath}/${fileName}`, "I am fresh and young");
      console.log("File created successfully");
    } catch (error) {
      console.error("Error creating file:", error);
    }
  } catch (error) {
    console.error("Error reading directory:", error);
  }
};

await create();
