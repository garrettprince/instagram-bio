import airplane from "airplane";
import { autoBioUpdate, testFunc } from ".";

export default airplane.task(
  {
    slug: "auto_update_bio",
    name: "auto-update-bio",
  },
  // This is your task's entrypoint. When your task is executed, this
  // function will be called.
  async () => {
    testFunc();
  }
);
