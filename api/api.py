from flask_api import FlaskAPI
from flask import request
from flask_cors import CORS, cross_origin
from fetch_data import get_result

app = FlaskAPI(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
@cross_origin()
def currency_converter():
    
    params = {
        '_from': request.args.get('f', 'BRL'),
        'to': request.args.get('t', 'USD'),
        'initial_value': float(request.args.get('i', 1)),
    }

    result = get_result(**params)

    return result

if __name__ == "__main__":
    app.run(debug=True)