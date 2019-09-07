import requests
import pickle

class BaseLocale(object):
    def __init__(self, name='', slug='', base_url='', force_update=False):        
        self.base_url = base_url
        self.name = name
        self.slug = slug
        self.apiKey = ''

        if force_update:
            self.get_updates()
        
        else:
            try:
                self.from_pickle()
        
            except FileNotFoundError:
                self.get_updates()
    
    def get_updates(self):
        self.edges = []         # Edges list: [(from, to, weight), ...]
        self.fill_edges_list()
        self.to_pickle()

    def __repr__(self):
        return "(Exchange Locale: {0})".format(self.name)

    def get(self, complement=""):
        return requests.get(self.base_url + complement)

    def to_json(self, response):
        return response.json()

    def to_pickle(self):
        with open('pickles/{0}.pickle'.format(self.name), 'wb') as pickle_file:
            pickle.dump(self, pickle_file)

    def from_pickle(self):
        with open('pickles/{0}.pickle'.format(self.name), 'rb') as pickle_data:
            self_obj = pickle.load(pickle_data)
            self.edges = self_obj.edges
            self.base_url = self_obj.base_url
            self.name = self_obj.name