module.exports = {
  apps: [
    {
      name: "nobull-gateway",
      script: "dist/index.js",
      node_args: "-r dotenv/config",
      // instances  : 4,
      // exec_mode  : "cluster"
    },
  ],
};
