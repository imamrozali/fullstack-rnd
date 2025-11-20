import { setupWorker } from "msw/browser";

import { handlers } from "./apis";

export const worker = setupWorker(...handlers);
