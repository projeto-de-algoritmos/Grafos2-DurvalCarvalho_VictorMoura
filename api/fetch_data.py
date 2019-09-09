from exchange_locales import (
    FixerIO, 
    CurrencyLayer, 
    ExchangeRatesAPI, 
    OpenExchange,
    CurrencyConverter
)

import pickle
import matplotlib.pyplot as plt
from collections import defaultdict

from math import log2

# The name of the currencies between the exchange_houses de change is 
# different (BRL_VF, BRL_VM, BRL_DU). 
# In order to exchange currencies between different exchange houses, it is 
# necessary create to create a vertex representing the currency (BRL) and 
# link all exchange offices.
def add_junction_currency_between_exchange_houses(edges):
    junction = set()

    for currencyA, currencyB, rate in edges:
        moneyA = currencyA[:3]
        moneyB = currencyB[:3]

        junction.add((moneyA, currencyA, 1))
        junction.add((currencyA, moneyA, 1))

        junction.add((moneyB, currencyB, 1))
        junction.add((currencyB, moneyB, 1))
    
    return list(junction)

def bellman_ford(ref, edges):
    
    dist = defaultdict(lambda:float('inf'))
    pred = defaultdict(lambda:float(-1))

    dist[ref] = 0
    pred[ref] = ref

    visited = set()

    edges = sorted(edges)
    for i in range(len(edges)):
        for u,v,w in edges:

            if not v in visited and dist[v] > dist[u] + w:
                visited.add(v)
                dist[v] = dist[u] + w
                pred[v] = u
    
    return dist, pred

def get_converter(edges):
    converter = {}
    for u, v, w in edges:
        converter[(u,v)] = w
    return converter


if __name__ == '__main__':
    edges = FixerIO().edges + CurrencyLayer().edges + ExchangeRatesAPI().edges + CurrencyConverter().edges
    
    edges += add_junction_currency_between_exchange_houses(edges)

    converter = get_converter(edges)

    _from = 'USD'
    to = 'BRL'

    print(len(edges))

    remove = []
    for u,v,w in edges:
        if u[:3] == _from and v[:3] == to or u[:3] == to and v[:3] == _from:
            remove.append((u,v,w))

    print(remove)
    
    edges = [ edge for edge in edges if not edge in remove]


    # jump cat -> max mult to min sum
    edges = [ (u,v, -log2(w)) for u,v,w in edges ]

    brl_to, pred = bellman_ford(_from ,edges)

    ans = 2**-brl_to[to]

    path = []
    p = to

    while(p != _from):
        path.append(p)
        p = pred[p]
    
    path.append(_from)

    path = list(reversed(path))

    total = 1000

    for i in range(len(path) - 1):
        pair = ( path[i], path[i+1] )
        total = total * converter[ pair ]
        print(pair, total)

    print('final: ', total)