from exchange_locales import (
    FixerIO, CurrencyLayer, 
    ExchangeRatesAPI, OpenExchange
)

if __name__ == '__main__':
    exchange_locales = [FixerIO(), CurrencyLayer(), ExchangeRatesAPI()]
    
    for locale in exchange_locales:
        locale.fill_edges_list()
        locale.to_pickle()