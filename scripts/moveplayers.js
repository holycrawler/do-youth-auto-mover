// 60 days
import axios from "axios";
const PLAYERS = [
  13725355, // player ids to move
  13890055,
  13805919,
  13890054,
  13805920,
  13725356,
  13729087,
  13890053,
  13894062,
  13890052,
  13728657,
  13805917
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
