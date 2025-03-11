import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Todo } from "./Todo";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Todo />
  </StrictMode>
);
