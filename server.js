/**
 * Entry point for Hostinger's Node.js App Manager (and similar Passenger-style
 * hosts), which expects a startup file that listens on the port it assigns
 * via process.env.PORT — `next start` alone doesn't read that.
 *
 * Requires `next build` to have already run (see DEPLOY.md).
 */
const { createServer } = require("http");
const next = require("next");

const port = Number(process.env.PORT) || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`Ready on port ${port}`);
  });
});
