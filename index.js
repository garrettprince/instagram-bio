import { IgApiClient } from "instagram-private-api";
import { jobTitles } from "./data.js";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const username = process.env.IG_USERNAME;
const password = process.env.IG_PASSWORD;

const usedJobsFilePath = path.join(__dirname, "used-jobs.json");

export async function autoBioUpdate() {
  // Instatiate the IgApiClient to use throughout function
  const ig = new IgApiClient();

  // Generate virtual device for remote login
  ig.state.generateDevice(username);

  // Establish array of used job titles from the jobTitles data array
  let usedJobTitles = [];

  // Read the usedJobTitles array from a JSON file
  try {
    const data = fs.readFileSync(usedJobsFilePath, {
      encoding: "utf8",
    });
    usedJobTitles = JSON.parse(data);
  } catch (error) {
    console.log("Error reading used words file:", error);
  }

  try {
    // Authenticate the Instagram account
    await ig.account.login(username, password);

    // Filter out the used words
    const availableJobs = jobTitles.filter(
      (job) => !usedJobTitles.includes(job)
    );

    // If all the words have been used, start over
    if (availableJobs.length === 0) {
      usedJobTitles = [];
    }

    // Choose a random word from the available words
    const chosenJob =
      availableJobs[Math.floor(Math.random() * availableJobs.length)];

    // Update the biography with the chosen word
    const bio = `${chosenJob}\n`;
    await ig.account.setBiography(bio);

    // Add the used word to the usedWords array and write it to the file
    usedJobTitles.push(chosenJob);
    try {
      fs.writeFileSync(usedJobsFilePath, JSON.stringify(usedJobTitles));
    } catch (error) {
      console.log("Error writing used words file:", error);
    }

    console.log("Bio updated successfully!");
  } finally {
    // Log out of Instagram when process complete
    process.nextTick(async () => await ig.simulate.postLoginFlow());
  }
}

autoBioUpdate();


