import { Transform } from "node:stream";

const transform = async () => {
  //Read data from std.in
  let data = "";
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", (chunk) => {
    data += chunk;
  });

  // Listen for the 'end' event to know when all data has been read
  process.stdin.on("end", () => {
    const reverseTransform = new Transform({
      transform(chunk, encoding, callback) {
        // Reverse the entire chunk (which is the full 'data' string)
        const reversedData = chunk
          .toString()
          .trim()
          .split("")
          .reverse()
          .join("");
        // Push the single reversed block
        this.push(reversedData + "\n");
        callback();
      },
    });

    // Pipe the transform stream's output to stdout
    reverseTransform.pipe(process.stdout);
    reverseTransform.write(data);
    reverseTransform.end();
  });

  console.log("Enter data to write to the file (Press Ctrl+D to finish):");
};

await transform();
