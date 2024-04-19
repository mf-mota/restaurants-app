import requests


def retrieve_restaurants(postcode: str) -> list:
    """ Retrieves restaurant data from the JUST EAT API"""

    # Using the User-Agent header from a browser, so that the API does not block the request
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0"
                      " Safari/537.36 Edg/123.0.0.0"
    }
    base_url = "https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/"
    url = base_url + postcode
    try:
        res = requests.get(url,headers=headers)

    except requests.exceptions.RequestException:
        print("Could establish connection to the API")
        return []

    else:
        if res.status_code == 200:
            restaurants = res.json()["restaurants"][0:10]  # only the first 10 restaurant objects
            restaurants.sort(key=lambda place: place["rating"]["starRating"], reverse=True)
            return restaurants

        return []


def get_centre_loc(restaurants: list) -> tuple:
    """Returns the average latitude and longitude of a list of restaurants as a tuple: (lon, lat)"""
    if len(restaurants) == 0:
        return 0, 0

    longitudes = []
    latitudes = []
    for restaurant in restaurants:
        longitudes.append(restaurant["address"]["location"]["coordinates"][0])
        latitudes.append(restaurant["address"]["location"]["coordinates"][1])

    return sum(longitudes)/len(longitudes), sum(latitudes)/len(latitudes)

