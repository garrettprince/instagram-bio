import dotenv from "dotenv";
import { IgApiClient } from "instagram-private-api";
import { CronJob } from "cron";
import { jobTitles } from "./data.js";
dotenv.config();

const username = process.env.IG_USERNAME;
const password = process.env.IG_PASSWORD;

// Express Server Stuff, not using yet
// import { application } from "express";
// const application = express();
// const port = process.env.PORT || 4000;

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });

const autoBioUpdate = async () => {
  // Array of job titles I want this function to cycle through

  // Instantiating the IG API Client
  const ig = new IgApiClient();

  // Generating virtual device to log in to Instagram
  ig.state.generateDevice(username);

  // Logging in with IG username and password
  await ig.account.login(username, password);

  // Log out of Instagram when done
  process.nextTick(async () => await ig.simulate.postLoginFlow());

  // Edit IG bio here
  // Line breaks are recognized
  await ig.account.setBiography("Jockey For The Tall Horses");

  // Edit IG profile details here
  //   await ig.account.editProfile({
  //     name: `Garrett Prince | "${jobTitles[62]}"`,
  //     biography: "Test",
  //   });
};

// const cronInsta = new CronJob("30 5 * * *", async () => {
//   autoBioUpdate();
// });

// cronInsta.start();

autoBioUpdate();

// const testFunc = () => {
//   console.log(jobTitles[62]);
// };

// testFunc();
