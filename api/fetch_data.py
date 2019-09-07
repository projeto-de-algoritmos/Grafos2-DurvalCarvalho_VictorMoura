from exchange_locales import (
    FixerIO, 
    CurrencyLayer, 
    ExchangeRatesAPI, 
    OpenExchange,
    CurrencyConverter
)

if __name__ == '__main__':
    
    FixerIO()
    print('25%')

    CurrencyLayer()
    print('50%')
    
    ExchangeRatesAPI()
    print('75%')

    CurrencyConverter()
    print('100%')