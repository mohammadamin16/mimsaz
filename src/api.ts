import axios from "axios";

const BASE_URL = "https://api.memebot.ocontest.ir";

declare let Bale: any;
// const userId = Bale?.initData?.user?.id || "311532832";
const userId = "311532832";

export function get_memes() {
  return axios.get(`${BASE_URL}/memebot`, {});
}

export function create_meme(
  template_id: string,
  text1: string,
  text2: string,
) {
  return axios.post(
    `${BASE_URL}/memebot`,
    {
      template_id: template_id,
      boxes: [text1, text2],
    },
    {
      headers: {
        "bale-id": userId,
      },
    }
  );
}

export function load_history() {
  return axios.get(`${BASE_URL}/memebot/history`, {
    headers: {
      "bale-id": userId,
    },
  });
}

export function send_to_me(url: string) {
  return axios.post(
    `${BASE_URL}/memebot/send`,
    {
      url,
    },
    {
      headers: {
        "bale-id": userId,
      },
    }
  );
}
