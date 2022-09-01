const hmr =
  process.env.NODE_ENV === "development"
    ? `<script>
        const ws = new WebSocket("ws://localhost:3000/_hmr");
        ws.addEventListener("open", () => ws.send("message"));
        ws.onmessage = (message) => {
          if (message.data === "reload") {
            window.location.reload();
          }
        };
      </script>`
    : "";

export default function Head(req = {}) {
  return `
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title></title>
      <link rel="stylesheet" href="/_static/styles.css">
      <link rel="icon" href="/_static/favicon.svg">
      ${hmr}
    </head>
  `;
}
