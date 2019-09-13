from exchange_locales import (
    FixerIO, 
    CurrencyLayer, 
    ExchangeRatesAPI, 
    OpenExchange,
    CurrencyConverter
)

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
    
    # inf as default value 
    dist = defaultdict(lambda:float('inf'))

    # -1 as default value
    pred = defaultdict(lambda:float(-1))

    dist[ref] = 0
    pred[ref] = ref

    # for some reason, if the edge dictionary is not sorted, the algorithm 
    # finds different paths between runs
    edges = sorted(edges)
    
    visited = set()
    for i in range(len(edges)):
        for u,v,w in edges:

            # WITHOUT NEGATIVE CYCLE
            # marking past vertices to avoid algorithm use negative cycles
            # remove to allow the algorithm to find the best path from one 
            # currency to another
            # if not v in visited:
            #     if dist[v] > dist[u] + w:
            #         visited.add(v)
            #         dist[v] = dist[u] + w
            #         pred[v] = u

            # WITH NEGATIVE CYCLE
            # Se eu permitir que o algoritmo use os caminhos negativos 
            # durante as N*M interações, quando tento encontrar o 
            # 'melhor caminho' na função get_path_from_a_to_b, o while vira 
            # um loop infinito
            if dist[v] > dist[u] + w:
                visited.add(v)
                dist[v] = dist[u] + w
                pred[v] = u
    
    return dist, pred

    converter = {}
        converter[(u,v)] = w
    return converter

# remove edge with direct conversion between the two currencies asked
def remove_direct_conversion_edges(edges, _from, to):
    remove = []
    for u,v,w in edges:
        if u[:3] == _from and v[:3] == to or u[:3] == to and v[:3] == _from:
            remove.append((u,v,w))
    edges = [ edge for edge in edges if not edge in remove]

    return edges

def read_edges_from_file():
    edges = []
    with open('edges.txt', 'r') as file:
        for line in file:
            u, v, w = line.split()
            edge = (u, v, float(w))
            edges.append(edge)
    return edges

# quando tento ir do AED(moeda do emirados árabes) para o BRL
def get_path_from_a_to_b(a, b):
        to = b
        _from = a
    
        path = []
        while(to != _from):
            # print(to) -> BUG LOOP INFINITO
            path.append(to)
            to = pred[to]
        
        path.append(_from)
        
        path = list( reversed(path) )
        return path

if __name__ == '__main__':

    # Essa parte faz a integração com as APIs. Eu salvei os dados da última
    # execução no arquivo edges.txt
    # edges = FixerIO().edges + CurrencyLayer().edges + ExchangeRatesAPI().edges + CurrencyConverter().edges
    
    edges = read_edges_from_file()
    edges += add_junction_currency_between_exchange_houses(edges)

    # dict to get convertion rate from 2 currency
    converter = get_converter(edges)

    _from = 'BRL'
    to = 'USD'

    # remove edge with direct conversion between the two currencies asked
    edges = remove_direct_conversion_edges(edges, _from, to)

    # jump cat -> max mult to min sum
    edges = [ (u,v, -log2(w)) for u,v,w in edges ]

    brl_to, pred = bellman_ford(_from ,edges)

    # getting the real convertion rates back
    brl_to = {curr: 2**(-log2_rate) for curr, log2_rate in brl_to.items()}

    print('Com 1 {0} é possível conseguir {1} da moeda {2}'.format(_from, brl_to[to], to))

    path = get_path_from_a_to_b(a=_from, b=to)

    total = 1000
    for i in range(len(path) - 1):
        pair = ( path[i], path[i+1] )
        total = round(total * converter[ pair ], 2)
        print(pair, round(total, 2))
    print('final: ', round(total, 2), 'convertion rate: ', total/1000 )
