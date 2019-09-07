#include <bits/stdc++.h>

using namespace std;

const int MAX { 550 }, oo { 1000000010 };
double dist[MAX][MAX], pred[MAX][MAX];

using edge = tuple<string, string, double>;
using ii = pair<int, double>;
vector<ii> adj[MAX];

map<string, int> vert_str_to_id;
vector<edge> edges;

void floyd_warshall(int N)
{
    for (int u = 1; u <= N; ++u)
        for (int v = 1; v <= N; ++v)
            dist[u][v] = oo;

    for (int u = 1; u <= N; ++u)
    {
        dist[u][u] = 0;
        pred[u][u] = u;
    }

    for (int u = 1; u <= N; ++u)
        for (const auto& [v, w] : adj[u]) {
            dist[u][v] = w;
            pred[u][v] = u;
        }

/*
    for (int k = 1; k <= N; ++k)
    {
        for (int u = 1; u <= N; ++u)
        {
            for (int v = 1; v <= N; ++v)
            {
                if (dist[u][v] > dist[u][k] + dist[k][v])
                {
                    dist[u][v] = dist[u][k] + dist[k][v];
                    pred[u][v] = pred[k][v];
                }
            }
        }
    }
    */
}

// GAMBIARRA
void load_from_file()
{
    ifstream file;
    stringstream aux;

    file.open("pred.txt");
    string line;

    string currA, currB; double rate;

    while (file.is_open() && !file.eof())
    {
        getline(file, line);
        aux << line;
        aux >> currA >> currB >> rate;
        aux.ignore(); aux.clear();
        edges.push_back({currA, currB, rate});
    }
}

// map to get vertice id by vertice name
void generate_vertices_ids()
{
    int id = 1;

    for(const auto& [u,v,w] : edges)
    {
        if (not vert_str_to_id[u])
            vert_str_to_id[u] = id++;

        if (not vert_str_to_id[v])
            vert_str_to_id[v] = id++;
    }
}


int main()
{   
    // cambiarras globais
    load_from_file();
    generate_vertices_ids();

    int N = vert_str_to_id.size();

    for (const auto& [u, v, w] : edges)
    {
        int id_u = vert_str_to_id[u];
        int id_v = vert_str_to_id[v];

        adj[id_u].push_back(ii(id_v, w));
    }

    floyd_warshall(N);

/*
    for (int u = 1; u <= N; ++u)
    {
        for (int v = 1; v <= N; ++v)
        {
            vector<int> path;
            auto p = v;

            while (p != u) {
                path.push_back(p);
                p = pred[u][p];
            } 

            path.push_back(u);
            reverse(path.begin(), path.end());

            cout << "dist[" << u << "][" << v << "] = " << dist[u][v] 
                << '\n';

            for (size_t i = 0; i < path.size(); ++i)
                cout << path[i] << (i + 1 == path.size() ? "\n" : " -> ");
        }
    }
*/

    return 0;
} 