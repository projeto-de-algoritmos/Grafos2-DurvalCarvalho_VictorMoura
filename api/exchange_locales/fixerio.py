from .base import BaseLocale

class FixerIO(BaseLocale):
    def __init__(self):
        super().__init__(
            name='FixerIO',
            slug='FI', 
            base_url='http://data.fixer.io/api/latest?access_key=9b5bea19dd89729aec4b177afd697bf9&format=1'
        )

    def fill_edges_list(self):
        eur = self.get()
        eur = self.to_json(eur)
        eur = eur['rates']
        
        self.edges = []

        for label in eur:
            self.edges.append(
                (
                    "{0}_{1}".format("EUR", self.slug),
                    "{0}_{1}".format(label, self.slug),
                    eur[label]
                )
            )