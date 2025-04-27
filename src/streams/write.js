import { createWriteStream } from 'node:fs';

const write = async () => {
    const pathToWrite = 'src/streams/files/fileToWrite.txt';
    // Create a writable stream for the target file
    const writableStream = createWriteStream(pathToWrite);

    writableStream.on('error', (error) => {
        console.error(`Error writing to file: ${error.message}`);
    });

    process.stdin.pipe(writableStream);

    process.stdin.on('end', () => {
        console.log('Finished reading from stdin.');
    });

    console.log('Enter data to write to the file (Press Ctrl+D to finish):');

};

await write();