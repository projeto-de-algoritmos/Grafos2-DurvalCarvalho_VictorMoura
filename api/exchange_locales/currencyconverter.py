# from .base import BaseLocale
from .base import BaseLocale

class CurrencyConverter(BaseLocale):
    def __init__(self):
        super().__init__(
            name='CurrencyConverter',
            slug='CC',
            base_url='https://free.currconv.com/api/v7/currencies?apiKey=cb73b6fa55a1e317a93b',
        )
        
    def fill_edges_list(self):
        response = self.get()
        response = self.to_json(response)

        # This api only allows 100 free requests, so I only limited it to 
        # the most relevant currencies.
        currencies = ["USD", "EUR", "GBP", "INR", "BRL", "RUB", "JPY", 
            "MXN", "CNY", "IDR"]

        self.edges = []
        self.base_url = 'https://free.currconv.com/api/v7/convert?apiKey=cb73b6fa55a1e317a93b&compact=ultra'

        for currA in currencies:
            for currB in currencies:
                if currA == currB:
                    continue

                curr = currA + '_' + currB
                query = '&q=' + curr
                resp = self.get(complement=query)
                rate = resp.json()[curr]

                self.edges.append(
                    (
                        '{0}_{1}'.format(currA, self.slug),
                        '{0}_{1}'.format(currB, self.slug),
                        rate
                    )
                )