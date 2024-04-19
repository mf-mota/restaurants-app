from flask import Flask
from flask import render_template
import utils.retrieve_data as rd


app = Flask(__name__)


@app.route("/")
def restaurants():
    postcode = "CB74DL"
    restaurants_at_postcode = rd.retrieve_restaurants(postcode=postcode)
    map_centre = rd.get_centre_loc(restaurants=restaurants_at_postcode)

    return render_template("index.html", postcode=postcode, data=restaurants_at_postcode,
                           map_centre=map_centre)


if __name__ == '__main__':
    app.run(debug=True)














































































































































































































































































































































































































































































































































































































































































































































































