from flask_api import FlaskAPI

app = FlaskAPI(__name__)

@app.route('/')
def hello_world():
    return {'hello': 'world', 'salve': 1232123}

if __name__ == "__main__":
    app.run(debug=True)