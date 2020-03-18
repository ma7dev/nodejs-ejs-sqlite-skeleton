import requests
import csv
import pytz
import datetime

host = 'http://localhost:8081/api/'

local = pytz.timezone("America/Los_Angeles")


def main():
    # GET
    print("GET: objects")
    get_cameras = requests.get(host + 'objects')
    print(get_cameras.status_code)
    print(get_cameras.json())

    # POST
    print("POST: objects")
    object_payload = {
        'className': 'vehicle',
        'timestamp': '482739434',
        'camera': '4'
    }
    post_objects = requests.post(host + 'objects', data=object_payload)
    print(post_objects.status_code)
    print(post_objects.json())


if __name__ == '__main__':
    main()
