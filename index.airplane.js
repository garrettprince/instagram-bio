import airplane from "airplane";
import { autoBioUpdate } from "./index.js";

export default airplane.task(
  {
    slug: "auto_update_bio2",
    name: "auto-update-bio2",
  },
  // This is your task's entrypoint. When your task is executed, this
  // function will be called.
  async () => {
    autoBioUpdate()
  }
);
