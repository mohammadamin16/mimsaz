#!/usr/bin/python3
import os 
import requests

URL = os.environ.get("URL", "bot_bot.surge.sh")

def check():
    res = requests.get(URL)
    return res.status_code == 200 


def rerun():
    print("Is down")
    os.system("surge --domain but_bot.surge.sh")

while True:
    if not check():
        rerun()


