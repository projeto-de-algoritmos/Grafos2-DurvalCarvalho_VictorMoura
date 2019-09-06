from .base import BaseLocale

class ExchangeRatesAPI(BaseLocale):
    def __init__(self):
        super().__init__(
            name='ExchangeRatesAPI',
            slug='ER', 
            base_url='https://api.exchangeratesapi.io/latest'
        )

    def fill_edges_list(self):
        eur = self.get()
        eur = self.to_json(eur)
        other_currencies = [curr for curr in eur['rates']]

        taxes_dict = {'EUR': eur}

        for currency in other_currencies:
            curr_response = self.get(complement='?base={0}'.format(currency))
            taxes_dict[currency] = self.to_json(curr_response)

        self.edges = []

        for currency in taxes_dict:
            for correspondent in taxes_dict[currency]['rates']:
                self.edges.append(
                    (
                        "{0}_{1}".format(currency, self.slug), 
                        "{0}_{1}".format(correspondent, self.slug), 
                        taxes_dict[currency]['rates'][correspondent]
                    )
                )