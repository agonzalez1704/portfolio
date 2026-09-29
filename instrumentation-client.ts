import { initBotId } from "botid/client/core";

// Server actions POST to the page that renders the form, so "/" covers the contact form.
initBotId({
  protect: [
    { path: "/api/chat", method: "POST" },
    { path: "/", method: "POST" },
  ],
});
