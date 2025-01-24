import axios from "axios";

const BASE_URL = "https://api.memebot.ocontest.ir";

declare let Bale: any;
const userId = Bale?.initData?.user?.id || "311532832";

export function get_memes() {
  return axios.get(`${BASE_URL}/memebot`, {});
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
export function sendCanvasToAPI(canvasElement) {
  // Convert canvas to Blob
  canvasElement.toBlob((blob) => {
    if (!blob) {
      console.error("Failed to convert canvas to Blob.");
      return;
    }

    // Convert Blob to File
    const file = new File([blob], "canvas_image.png", {
      type: "image/png", // Set the MIME type
    });

    // Create FormData and append the file
    const formData = new FormData();
    formData.append("file", file);

    // Send the file to the API using fetch
    fetch(`${BASE_URL}/memebot/send`, {
      method: "PUT",
      headers: {
        "bale-id": userId, // Custom header
      },
      body: file, // Send the file as binary data
    })
      .then((response) => {
        if (response.ok) {
          console.log("File uploaded successfully!");
          return response.json(); // Parse JSON response if applicable
        } else {
          throw new Error(`Error uploading file: ${response.status}`);
        }
      })
      .then((data) => {
        console.log("Server response:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, "image/png"); // Specify the image format (e.g., 'image/png', 'image/jpeg')
}
