from fixerio import FixerIO
from currencylayer import CurrencyLayer
from exchangeratesapi import ExchangeRatesAPI

if __name__ == '__main__':
    exchange_locales = [FixerIO(), CurrencyLayer(), ExchangeRatesAPI()]
    
    for locale in exchange_locales:
        locale.fill_edges_list()
        locale.to_pickle()

