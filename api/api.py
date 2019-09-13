from flask_api import FlaskAPI
from flask_cors import CORS, cross_origin

app = FlaskAPI(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
@cross_origin()
def hello_world():
    return {'hello': 'world', 'salve': 1232123}

if __name__ == "__main__":
    app.run(debug=True)