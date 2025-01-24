import requests

# Constants
BASE_URL = 'https://api.memebot.ocontest.ir'  # Replace with your API base URL
USER_ID = '311532832'


def send_to_me(file_path: str):
    """
    Uploads a file using a PUT request.

    :param file_path: Path to the file to upload.
    """
    # Open the file in binary mode
    with open(file_path, 'rb') as file:
        # Send the PUT request
        response = requests.put(
            f'{BASE_URL}/memebot/send',
            data=file,  # File content
            headers={
                'bale-id': USER_ID,  # Custom header
                'Content-Type': 'application/octet-stream',  # Set content type for binary data
            }
        )

    # Check the response
    if response.status_code == 200:
        print('File uploaded successfully!')
        print('Server response:', response)
    else:
        print('Error uploading file:', response.status_code)
        print('Server response:', response.text)


# Example usage
send_to_me('pic.png')  # Replace with the path to your file
