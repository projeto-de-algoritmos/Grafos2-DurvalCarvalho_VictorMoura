from .base import BaseLocale

class OpenExchange(BaseLocale):
    def __init__(self):
        super().__init__(
            name='OpenExchangeAPI',
            slug='OE', 
            base_url='https://openexchangerates.org/api/latest.json?app_id=3b552121bfe4495da6d57c130b2c9ae5'
        )

    def fill_edges_list(self):
        usd = self.get()
        usd = self.to_json(usd)
        usd = usd['rates']

        self.edges = []

        for currency, conversion_rate in usd.items():
            self.edges.append(
                (
                    '{0}_{1}'.format('USD', self.slug),
                    '{0}_{1}'.format(currency, self.slug),
                    conversion_rate
                )
            )
        
if __name__ == '__main__':
    oe = OpenExchange().fill_edges_list()