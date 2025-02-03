import axios from "axios";
const PLAYERS = [
  13640706, 13725355, 13725356, 13725353, 13728657, 13805918, 13810656,
  13805917, 13805920, 13729087, 13640707,
]; // players ids to move

const login = async () => {
  const url = "https://www.dugout-online.com/";
  const payload = new URLSearchParams({
    attemptLogin: 1,
    do_user: process.env.DO_USER,
    do_pass: process.env.DO_PASS,
  });
  const cookies = process.env.COOKIE;

  try {
    await axios.post(url, payload.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: cookies,
      },
      withCredentials: true,
    });
    console.log("login successful");
  } catch (error) {
    console.error("failed to login", error.message);
  }
};
const movePlayers = async (playerIds) => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Cookie: process.env.COOKIE,
  };
  await Promise.all(
    playerIds.map(async (player) => {
      try {
        await axios.post(
          `https://www.dugout-online.com/players/details/playerID/${player}`,
          process.env.PAYLOAD,
          { headers }
        );
        console.log(`Player: ${player} moved successfully`);
      } catch (error) {
        console.error(`Error moving player: ${player}`, error.message);
      }
    })
  );
};
await login();
await movePlayers(PLAYERS);
