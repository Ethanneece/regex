class DFS {
    private readonly graph: DirectedGraph //graph on which to conduct DFS
    private readonly marked: boolean[]  // marked[v] = true indicates v is reachable from source(s)

    /**
     * Computes the vertices in directed graph g that are
     * reachable from the source vertex s.
     * @param g the digraph
     * @param s the source vertex
     * @throws Error unless 0 <= s <= V-1
     */
    public constructor(g: DirectedGraph) {
        this.graph = g
        this.marked = new Array(g.getV())
    }

    /**
     * Computes the vertices in the graph that are
     * connected to the source vertice s.
     * @param s contains the source vertice
     * @throws Error unless 0 <= s < V
     */

    public computeForVertex(s: number) {
        this.checkVertexValidity(s)
        this.dfs(s)
    }

    /**
     * Computes the vertices in the graph that are
     * connected to any of the source vertices sources.
     * @param sources contains vertices
     * @throws Error if sources is empty
     * @throws Error unless 0 <= s < V for all verteces in sources
     */
    public computeForVertices(sources: number[]) {
        this.checkVerticesValidity(sources)
        for (let v of sources) {
            if (!this.marked[v]) this.dfs(v)
        }
    }

    private dfs(v: number) {
        this.marked[v] = true
        for (let w of this.graph.getAdj(v))
            if (!this.marked[w]) this.dfs(w)
    }

    /**
     * Return true if there is a directed path from any vertex to v
     * @param  v the vertex
     * @throws Error unless 0 <= v < V
     */
    public isReachable(v: number) {
        this.checkVertexValidity(v)
        return this.marked[v]
    }

    /** raise an Error unless 0 <= v <= V - 1
     */
    private checkVertexValidity(v: number) {
        if (v < 0 || v >= this.marked.length)
            throw new Error("vertex " + v + " is not between 0 and " + (this.marked.length - 1))
    }

    /** raise an Error any vertices is either 0 or not between 0 and V-1
     */
    private checkVerticesValidity(vertices: number[]) {
        let vertexCount = 0
        for (let v of vertices) {
            vertexCount++
            if (v == null)
                throw new Error("vertex is null")
            this.checkVertexValidity(v)
        }
        if (vertexCount == 0)
            throw new Error("zero vertices")
    }
}