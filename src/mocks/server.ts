import { setupServer } from "msw/node";

import { handlers } from "./apis";

export const server = setupServer(...handlers);
