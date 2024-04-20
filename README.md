# Restaurants App
Small flask application that retrieves restaurant data from the Just Eat API and displays it.

## How do I get up and running?
You can test the web page using a Flask dev server. Follow the steps below.

- Download or clone this repo using git (command: git clone https://github.com/mf-mota/restaurants-app.git)
- cd into the created folder
- Open your preferred command line interface (I use git bash)
- Make sure you have a recent version of Python installed in your machine
- Create a virtual environment (command: py -m venv venv)
- Activate it with the command: source venv/Scripts/activate
- Install all dependencies in the created virtual environment using the provided
requirements.txt file. You can use the following command: pip install -r requirements.txt
- Run the main.py file, from an IDE or using the command: py main.py
- Copy the http link given in the terminal and paste it in your web browser to open the webpage being served by the localhost server. 
By default the server runs on port 5000 (localhost:5000)


## Assumptions
- The pieces of data returned in the Just Eat's API restaurant objects that should be displayed to the user are not null.
Each restaurant object must include an id, name, starRating, address (city, first line, postal code and coordinates) and cuisine(s).
- If the status code in the API response is not equal to 200, or a connection cannot be established, an error message is displayed.
- The use of external libraries is allowed.

## Potential Improvements
- Adjust the map's initial zoom to fit all restaurants' pins.
Sometimes a couple of the first 10 restaurants returned by the Just Eats API are located in other towns/ cities.
- Sort by rating and filter by cuisine (e.g. dropdown lists)
- Handle missing attributes in the restaurant objects
- Adjust the page for devices with screens of smaller widths (mobile) and add aria-labels for accessibility

## Screenshots
![all_restaurants](https://github.com/mf-mota/restaurants-app/assets/74459782/2968f1f7-22c2-4760-b4f7-7fe05e652d1d)

Hover over a restaurant's card to zoom in on its location

![restaurant_view](https://github.com/mf-mota/restaurants-app/assets/74459782/4c5ab69a-960b-467e-a90e-95125ae33bc3)


