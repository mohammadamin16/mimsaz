import axios from "axios";

const BASE_URL = "http://192.168.207.207:4040";

export function get_memes() {
  return axios.get(`${BASE_URL}/memebot`, {});
}

export function create_meme(
  template_id: string,
  text1: string,
  text2: string,
  bale_id: string
) {
  return axios.post(
    `${BASE_URL}/memebot`,
    {
      template_id: template_id,
      boxes: [text1, text2],
    },
    {
      headers: {
        "bale-id": bale_id,
      },
    }
  );
}

export function load_history() {
  return axios.get(`${BASE_URL}/memebot/history`, {
    headers: {
      "bale-id": "123",
    },
  });
}

export function send_to_me(url: string, bale_id: string) {
  return axios.post(
    `${BASE_URL}/memebot/send`,
    {
      url,
    },
    {
      headers: {
        "bale-id": bale_id,
      },
    }
  );
}
