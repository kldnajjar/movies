import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://22ffbeb0e51a4fb6928f7a959f563237@sentry.io/1512398"
  });
}

function log(msg) {
  console.log(msg);
}

export default {
  init,
  log
};
