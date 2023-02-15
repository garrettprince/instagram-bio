import dotenv from "dotenv";
import { IgApiClient } from "instagram-private-api";
import { jobTitles } from "./data.js";
dotenv.config();

const username = process.env.IG_USERNAME;
const password = process.env.IG_PASSWORD;

export const autoBioUpdate = async () => {
  // Array of job titles I want this function to cycle through

  // Instantiating the IG API Client
  const ig = new IgApiClient();
  
  // Generating virtual device to log in to Instagram
  ig.state.generateDevice(username);
  
  // Logging in with IG username and password
  await ig.account.login(username, password);
  
  // Log out of Instagram when done
  process.nextTick(async () => await ig.simulate.postLoginFlow());
  
  let test = "test2";

  // Edit IG profile details here
  // Interpolation isn't working for some reason, using ES2015 rules instead by establishing a variable before hand containg the string requested
  await ig.account.editProfile({
    // name: "Garrett Prince",
    bio: `${test}`,
  });

  // If line breaks are needed in bio, edit IG bio this way UPDATE, doesn't work
  //   await ig.account.setBiography("Jockey For The Tall Horses");
};

autoBioUpdate();

// export const testFunc = () => {
//   console.log(jobTitles[61]);
// };

// testFunc();
