from flask_api import FlaskAPI
from flask import request, render_template
from flask_cors import CORS, cross_origin
from fetch_data import get_result
from get_country_data import get_country_data

app = FlaskAPI(__name__, static_url_path='')

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/converter/')
@cross_origin()
def currency_converter():
    
    params = {
        '_from': request.args.get('f', 'BRL'),
        'to': request.args.get('t', 'USD'),
        'initial_value': float(request.args.get('i', 1)),
    }

    result = get_result(**params)

    return result

@app.route('/')
@cross_origin()
def root():
    return render_template("index.html")

@app.route('/country_data')
@cross_origin()
def country_data():

    result = get_country_data()

    return result

if __name__ == "__main__":
    app.run(debug=True)