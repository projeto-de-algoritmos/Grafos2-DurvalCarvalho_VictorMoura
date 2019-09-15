import requests

def get_country_data():
    json_data = requests.get("https://restcountries.eu/rest/v2/all")

    json_data = json_data.json()

    print(json_data)

    response = []



    obj = {
        'name': "Europe",
        'abbreviation': "EUR",
        'symbol': '€',
        'currency_name': "Euro",
        'flagURL': "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg"
    }

    response.append(obj)

    for country in json_data:

        if country['currencies'][0]['name'] == 'Euro':
            continue

        obj = {
            'name': country['name'],
            'abbreviation': country['currencies'][0]['code'],
            'symbol': country['currencies'][0]['symbol'],
            'currency_name': country['currencies'][0]['name'],
            'flagURL': country['flag']
        }


        response.append(obj)

    return response