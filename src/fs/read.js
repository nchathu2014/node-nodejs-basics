import { readFile,readdir } from 'node:fs/promises';
import path from 'node:path';

const read = async () => {
    const filePath = 'src/fs/files';
    const filePathToRead = path.join(filePath, 'fileToRead.txt');
    const failureMessage = 'FS operation failed';

    try {
        const filesInDir = await readdir(filePath);
        if(!filesInDir.includes('fileToRead.txt')) {
            throw new Error(failureMessage);
        }
        // Attempt to read the file content
        const content = await readFile(filePathToRead, 'utf8');
        console.log(content);
    } catch (error) {
        throw new Error(failureMessage);
    }
};

await read();