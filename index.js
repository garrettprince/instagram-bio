import dotenv from "dotenv";
import { IgApiClient } from "instagram-private-api";
import { CronJob } from "cron";
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
  const jobTitles = [
    "Part Time Treasure Hunter",
    "Train Pusher",
    "'Ruby' Guy",
    "Professional Mourner",
    "Discgraced Odor Judge",
    "Electrified Domino's Delivery Car",
    "Full Time Gimp",
    "Hungry Assistant Chef",
    "Rush Roadie",
    "Snake Milkman",
    "Old Youngman",
    "Part Time Jewel 'Borrower'",
    "Body Hair Enthusiast",
    "Tired CEO Sympathizer",
    "Horny Preacher",
    "Believable Alien",
    "Full Time Mom",
    "Cement Seer",
    "Oracle of the Ugly",
    "Seaman",
    "Freezing Cold Mayor",
    "YouTube Appraiser",
    "Gut Enthusiast",
    "Ice Cream Denier",
    "Warm Beef Appraiser",
    "Love Falcon",
    "DragonBall Z Historian",
    "Postpubescant",
    "Succession Critic",
    "Apartment Spear Hunter",
    "Thighdiver",
    "RateMyTeacher Admin",
    "Aquatic Hitman",
    "Discgraced Decathlete",
    "G.I. Joe Court Marshall",
    "Equine Attourney",
    "Mortuary Ventriloquist",
    "Space Apologist",
    ""
  ];

  // Instantiating the IG API Client
  const ig = new IgApiClient();

  // Generating virtual device to log in to Instagram
  ig.state.generateDevice(username);

  // Logging in with IG username and password
  await ig.account.login(username, password);

  // Log out of Instagram when done
  process.nextTick(async () => await ig.simulate.postLoginFlow());

  // Actual editing of IG bio here
  // Line breaks are recognized
  await ig.account.setBiography(
    `bio
    second line`
  );
};

// const cronInsta = new CronJob("30 5 * * *", async () => {
//   autoBioUpdate();
// });

// cronInsta.start();

// autoBioUpdate();

// const testFunc = () => {
//   console.log(username);
// };

// testFunc();
