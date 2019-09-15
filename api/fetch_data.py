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
            if not v in visited:
                if dist[v] > dist[u] + w:
                    visited.add(v)
                    dist[v] = dist[u] + w
                    pred[v] = u

            # WITH NEGATIVE CYCLE
            # Se eu permitir que o algoritmo use os caminhos negativos 
            # durante as N*M interações, quando tento encontrar o 
            # 'melhor caminho' na função get_path_from_a_to_b, o while vira 
            # um loop infinito
            # if dist[v] > dist[u] + w:
            #     visited.add(v)
            #     dist[v] = dist[u] + w
            #     pred[v] = u
    
    return dist, pred

# function to get the conversion rate between 2 currencies
def get_converter(edges):
    converter = {}
    for u, v, w in edges:
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
def get_path_from_a_to_b(a, b, pred):
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

def dfs(at, root_node, valid_paths, adj_list, visited):
    
    if visited[at]:
        return valid_paths
    
    visited[at] = True

    valid_paths[root_node].add(at)

    for n in adj_list[at]:
        valid_paths = dfs(n, root_node, valid_paths, adj_list, visited)
    
    return valid_paths

def get_valid_paths(edges):

    adj_list = defaultdict(set)
    valid_paths = defaultdict(set)

    for v, u, w in edges:
        adj_list[v].add(u)
    
    for u in adj_list:
        visited = defaultdict(lambda:False)
        valid_paths = dfs(u, u, valid_paths, adj_list, visited)

    return valid_paths

def get_result(_from='BRL', to='USD', initial_value=1):

    # Essa parte faz a integração com as APIs. Eu salvei os dados da última
    # execução no arquivo edges.txt
    edges = FixerIO().edges + CurrencyLayer().edges + ExchangeRatesAPI().edges + CurrencyConverter().edges
    
    # edges = read_edges_from_file()
    edges += add_junction_currency_between_exchange_houses(edges)
    
    # dicionário para verificar se da moeda A é possível atingir a moeda B
    valid_paths = get_valid_paths(edges)

    if to not in valid_paths[_from]:
        response = {"nonexistent_path":True}
        return response

    # dict to get convertion rate from 2 currency
    converter = get_converter(edges)

    # remove edge with direct conversion between the two currencies asked
    edges = remove_direct_conversion_edges(edges, _from, to)

    # jump cat -> max mult to min sum
    edges = [ (u,v, -log2(w)) for u,v,w in edges ]

    brl_to, pred = bellman_ford(_from ,edges)

    # getting the real convertion rates back
    brl_to = {curr: 2**(-log2_rate) for curr, log2_rate in brl_to.items()}

    # print('Com 1 {0} é possível conseguir {1} da moeda {2}'.format(_from, brl_to[to], to))

    path = get_path_from_a_to_b(a=_from, b=to, pred=pred)

    response = {
        "conversion_factor": brl_to[to],
        "path": []
    }    

    total = initial_value
    for i in range(len(path) - 1):
        pair = ( path[i], path[i+1] )
        total = round(total * converter[ pair ], 2)
        response["path"].append({
            "edge": pair,
            "conversion_factor": round(total, 2)
        })
    # print('final: ', round(total, 2), 'convertion rate: ', total/1000 )

    print(response)

    return response

# get_result()

if __name__ == '__main__':
    r = get_result(_from='BRL', to='INR', initial_value=1000)
    print(r)
    # edges = FixerIO().edges + CurrencyLayer().edges + ExchangeRatesAPI().edges + CurrencyConverter().edges