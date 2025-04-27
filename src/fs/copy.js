import { mkdir, readdir, copyFile, stat } from 'node:fs/promises';

const copy = async () => {
    const sourcePath = 'src/fs/files';
    const destPath = 'src/fs/files_copy';

    try {
        // Check if the source folder exists and is a directory
        const sourceStats = await stat(sourcePath);
        if (!sourceStats.isDirectory()) {
            throw new Error('FS operation failed');
        }

        // Check if the destination folder already exists
        try {
            const destStats = await stat(destPath);
            if (destStats.isDirectory()) {
                throw new Error('FS operation failed');
            }
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }

        // Create the destination folder
        await mkdir(destPath);

        // Read files from the source folder
        const files = await readdir(sourcePath);
        for (const file of files) {
            const sourceFile = `${sourcePath}/${file}`;
            const destFile = `${destPath}/${file}`;
            await copyFile(sourceFile, destFile);
        }

        console.log('Files copied successfully');
    } catch (error) {
        console.error('Error:', error.message);
    }
};

await copy();