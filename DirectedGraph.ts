class DirectedGraph {
    private readonly V: number        // number of vertices
    private E: number  // number of edges
    private readonly adj: number[][]    // adj[v] = adjacency list for a given vertex

    /**
     * Creates an empty directed graph with v vertices.
     */
    public constructor(v: number) {
        if (v < 0)
            throw new Error("Negative num of vertices " + v)
        this.V = v
        this.E = 0
        this.adj = new Array(this.V)
        for (let i = 0; i < this.V; i++)
            this.adj[i] = []
    }

    /**
     * Returns the number of vertices
     */
    public getV = (): number => this.V;

    /**
     * Adds the directed edge v→w to this directed graph.
     *
     * @param  v the head vertex
     * @param  w the tail vertex
     * @throws Error unless both {@code 0 <= v < V} and {@code 0 <= w < V}
     */
    public addEdge(v: number, w: number) {
        this.checkVertexValidity(v)
        this.checkVertexValidity(w)
        this.adj[v].push(w)
        this.E++
    }

    /**
     * Returns the vertices adjacent from vertex v.
     * @param  v the vertex
     * @return the vertices adjacent from vertex v as an array
     * @throws Error unless 0 <= v < V
     */
    public getAdj(v: number): number[] {
        this.checkVertexValidity(v)
        return this.adj[v]
    }

    /**
     * Returns a string representation of this directed graph.
     */
    public toString(): string {
        let s = "" 
        s = this.V + " vertices, " + this.E + " edges \n"
        for (let v = 0; v < this.V; v++) {
	    let line = v + ": "
            for (let e of this.adj[v]) {
		line += e + ", " 
            }
            s += line + "\n"
        }
        return s
    }

    // throw an Error unless {@code 0 <= v < V}
    private checkVertexValidity(v: number) {
        if (v < 0 || v >= this.V)
            throw new Error("vertex " + v + " must be between 0 and " + (this.V - 1))
    }
}
