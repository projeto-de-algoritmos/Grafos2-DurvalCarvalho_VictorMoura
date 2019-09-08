#include <bits/stdc++.h>

using namespace std;

using edge = tuple<string, string, double>;
using ii = pair<int, double>;

const int MAX { 550 };
const int oo { 1000000010 };

double dist[MAX][MAX];
double pred[MAX][MAX];
map<int, bool> visited;

vector<ii> adj[MAX];
set<int> possible_queries[MAX];

void floyd_warshall(int N)
{
    for (int u = 1; u <= N; ++u)
        for (int v = 1; v <= N; ++v)
            dist[u][v] = 0;

    for (int u = 1; u <= N; ++u)
    {
        dist[u][u] = 1;
        pred[u][u] = u;
    }

    for(int u = 1; u <= N; ++u)
    {
        for(const auto& [v, w] : adj[u]) 
        {
            dist[u][v] = w;
            pred[u][v] = u;
        }
    }

    for (int k = 1; k <= N; ++k)
    {
        for (int u = 1; u <= N; ++u)
        {
            for (int v = 1; v <= N; ++v)
            {
                // I'm looking for conversions that make my 
                // currency worth more
                if (dist[u][v] < dist[u][k] * dist[k][v])
                {
                    dist[u][v] = dist[u][k] * dist[k][v];
                    pred[u][v] = pred[k][v];
                }
            }
        }
    }
}

void load_from_file(vector<edge>& edges)
{
    ifstream file;
    stringstream aux;

    file.open("pred.txt");
    string line;

    string currA, currB; double rate;

    while (file.is_open() && !file.eof())
    {
        getline(file, line);

        // passing the line readed to a stringstream to simplify 
        // the split of the three information
        aux << line;
        aux >> currA >> currB >> rate;

        // cleaning the stringstream
        aux.ignore(); aux.clear();

        edges.push_back({currA, currB, rate});
    }
}

// map to get vertice id by vertice name
void generate_vertices_ids(map<string,int>& name_to_id, 
    map<int, string>& id_to_name, const vector<edge> edges)
{
    int id = 1;

    for(const auto& [u,v,w] : edges)
    {
        if (not name_to_id[u])
        {
            name_to_id[u] = id;
            id_to_name[id] = u;
            id++;
        }

        if (not name_to_id[v])
        {
            name_to_id[v] = id;
            id_to_name[id] = v;
            id++;
        }
    }
}

void dfs(int at, int started_at)
{
    if(visited[at])
        return;

    visited[at] = true;

    possible_queries[started_at].insert(at);

    for(const auto& [v,w]  : adj[at])
        dfs(v, started_at);
}

void get_possible_queries(int N)
{
    for(int u = 1; u <= N; ++u)
    {
        visited.clear();
        dfs(u, u);
    }
}


int main()
{   
    vector<edge> edges;
    load_from_file(edges);

    map<string, int> name_to_id;
    map<int, string> id_to_name;
    generate_vertices_ids(name_to_id, id_to_name, edges);

    int N = name_to_id.size();

    // creating a list of adjacent using the vertices id
    for(const auto& [u, v, w] : edges)
    {
        int id_u = name_to_id[u];
        int id_v = name_to_id[v];
        adj[id_u].push_back(ii(id_v, w));
    }



    // fill possible_queries which contains all possible queries
    get_possible_queries(N);

    // for(int i=1; i<=N; i++)
    // {
    //     cout << id_to_name[i] << ": ";

    //     for(auto v : possible_queries[i])
    //         cout << id_to_name[v] << ' ';

    //     cout << endl << endl;
    // }

    // return 0;

    floyd_warshall(N);

    int id_from = name_to_id["BRL"];
    int id_to = name_to_id["RBL"];

    // cout << dist[id_from][id_to] << endl;

    for (int u = 1; u <= N; ++u)
    {
        for (int v = 1; v <= N; ++v)
        {
            if(not possible_queries[u].count(v))
                continue;

            vector<int> path;
            auto p = v;

            string u_name = id_to_name[u];
            string v_name = id_to_name[v];

            bool flag = false;

            while (p != u)
            {
                if (path.size() < 10000)
                {
                    flag = true;
                    break;
                }

                path.push_back(p);
                p = pred[u][p];
            } 

            if (flag)
                continue;

            path.push_back(u);
            reverse(path.begin(), path.end());

            cout << "dist[" << u_name << "][" << v_name << "] = " 
                << dist[u][v] << '\n';

            for (size_t i = 0; i < path.size(); ++i)
            {
                cout << id_to_name[path[i]] 
                    << (i + 1 == path.size() ? "\n" : " -> ");
            }

            cout << endl;
        }
    }

    return 0;
} 