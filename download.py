import urllib.request
import urllib.error

url = 'https://raw.githubusercontent.com/djaiss/mapsicon/master/all/ne/vector.svg'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})

try:
    with urllib.request.urlopen(req) as response:
        with open('public/niger-mask.svg', 'wb') as out_file:
            out_file.write(response.read())
    print("Download successful")
except Exception as e:
    print(f"Error downloading: {e}")
