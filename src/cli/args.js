const parseArgs = () => {
  const args = process.argv.slice(2);
  const outputParts = [];

  // Iterate through arguments
  for (let i = 0; i < args.length; i += 2) {
    const propNameArg = args[i];
    const value = args[i + 1];

    const propName = propNameArg.startsWith("--")
      ? propNameArg.substring(2)
      : propNameArg;
    outputParts.push(`${propName} is ${value}`);
  }

  console.log(outputParts.join(", "));
};

parseArgs();
