const parseEnv = () => {
  const prefix = "RSS_";
  const rssVars = [];

  // Iterate over all environment variables
  for (const key in process.env) {
    if (key.startsWith(prefix)) {
      rssVars.push(`${key}=${process.env[key]}`);
    }
  }
  console.log(rssVars.join("; "));
};

parseEnv();
