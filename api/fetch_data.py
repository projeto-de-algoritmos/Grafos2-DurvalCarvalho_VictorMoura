from exchange_locales import (
    FixerIO, 
    CurrencyLayer, 
    ExchangeRatesAPI, 
    OpenExchange,
    CurrencyConverter
)

import pickle
import matplotlib.pyplot as plt

import networkx as nx
from networkx.algorithms.shortest_paths.dense import floyd_warshall_predecessor_and_distance

if __name__ == '__main__':
    data = FixerIO().edges + CurrencyLayer().edges + ExchangeRatesAPI().edges + CurrencyConverter().edges

    # Arestas que unem as moedas independente da casa de câmbio
    # BRL -> BRL_FO, BRL_FO -> BRL
    unique = set()
    for currencyA, currencyB, rate in data:
        moneyA = currencyA[:3]
        moneyB = currencyB[:3]

        unique.add((moneyA, currencyA, 1))
        unique.add((currencyA, moneyA, 1))

        unique.add((moneyB, currencyB, 1))
        unique.add((currencyB, moneyB, 1))
    
    data += list(unique)
    
    # dicionário para achar a taxa de câmbio de acordo com a transação
    convert = {}
    for currencyA, currencyB, rate in data:
        convert[(currencyA, currencyB)] = rate

    G = nx.DiGraph()
    G.add_weighted_edges_from(data)     # O(n**3) -> Demora!

    # Salvar os resultados obtidos
    try:
        with open('pickles/floyd_warshall_predecessor.pickle', 'rb') as pkl:
            predecessors = pickle.load(pkl)
    
    except FileNotFoundError:
        predecessors, _ = nx.floyd_warshall_predecessor_and_distance(G)
        with open('pickles/floyd_warshall_predecessor.pickle', 'wb') as pkl:
            pickle.dump(predecessors, pkl)

    for a,b,c in data:
        print(a,b,c)

    # lst = nx.reconstruct_path('BRL', 'USD', predecessors)
    # print(lst)

    # money = 1000

    # for i in range(len(lst)-1):
    #     tpl = (lst[i], lst[i+1])
    #     money = convert[tpl] * money
    #     print(money)
