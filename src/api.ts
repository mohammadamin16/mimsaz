import axios from "axios";

const BASE_URL = "https://api.memebot.ocontest.ir";

declare let Bale: any;
const userId = Bale?.initData?.user?.id || "311532832";

export function get_memes() {
  return axios.get(`${BASE_URL}/memebot?box_count=0`);
}

export function create_meme(template_id: string, text1: string, text2: string) {
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

export function upload_meme(file: File | Blob | ArrayBuffer, fileName: string) {
  return axios.put(`${BASE_URL}/memebot/send`, file, {
    headers: {
      "bale-id": userId,
    },
  });
}
export async function sendCanvasToAPI(canvasElement) {
  return new Promise((resolve, reject) => {
    canvasElement.toBlob(async (blob) => {
      if (!blob) {
        reject(new Error("Failed to convert canvas to Blob."));
        return;
      }

      const file = new File([blob], "canvas_image.png", {
        type: "image/png",
      });

      try {
        const response = await fetch(`${BASE_URL}/memebot/send`, {
          method: "PUT",
          headers: {
            "bale-id": userId,
          },
          body: file,
        });

        if (!response.ok) {
          throw new Error(`Error uploading file: ${response.status}`);
        }

        resolve(response);
      } catch (error) {
        reject(error);
      }
    }, "image/png");
  });
}
