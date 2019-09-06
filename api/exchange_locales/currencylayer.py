from .base import BaseLocale

class CurrencyLayer(BaseLocale):
    def __init__(self):
        super().__init__(
            name='CurrecyLayer',
            slug='CL', 
            base_url='http://www.apilayer.net/api/live?access_key=3865924eff2e88fa8f77a25266fbcacb&format=1'
        )

    def fill_edges_list(self):
        usd = self.get()
        usd = self.to_json(usd)
        usd = usd['quotes']
        
        self.edges = []

        for label in usd:
            compared_currency = label[-3:]
            self.edges.append(
                (
                    "{0}_{1}".format(label[:-3], self.slug),
                    "{0}_{1}".format(compared_currency, self.slug),
                    usd[label]
                )
            )