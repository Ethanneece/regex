class RegExMatcher {

    public readonly nfa: DirectedGraph  // digraph of epsilon transitions
    private regexp: string     // regular expression
    private readonly n: number  // number of characters in regular expression

    /**
     * Construct an NFA Directed Graph from the given regular expression.
     * @param  regexp the regular expression
     */
    public constructor(re: string) {

        //Surronding Expresion to create valid regex
        this.regexp = "(" + re + ")"
        this.n = this.regexp.length 

        let vertexes = 0 
        
        //Regex metacharacters this checks for 
        const metaCharacters = ["(", ")", "|", "*"]

        //Stack used for keeping track of metaCharacters
        let stack = new Array()

        this.nfa = new DirectedGraph(this.n + 1)

        //Creating directed graph off regex passed in 
        for (let i = 0; i < this.regexp.length; i++)
        {
            if (metaCharacters.includes(this.regexp.charAt(i)))
            {
                if (this.regexp.charAt(i) == "*")
                {
                    this.nfa.addEdge(i, i + 1)

                    //Need to create an edge at first '(' if expression was in parenthesis. 
                    if (this.regexp.charAt(i - 1) == ")")
                    {
                        let lastPare = this.regexp.substring(0, i).lastIndexOf("(")

                        this.nfa.addEdge(lastPare, i)
                        this.nfa.addEdge(i, lastPare)
                    }
                    else
                    {
                        this.nfa.addEdge(i - 1, i)
                        this.nfa.addEdge(i, i - 1)
                    }
                }

                //Keeping track of location of '('.
                else if (this.regexp.charAt(i) == "(")
                {
                    this.nfa.addEdge(i, i + 1)

                    stack.push(["(", i])
                }

                else if (this.regexp.charAt(i) == "|")
                {
                    stack.push(["|", i])
                }

                else if (this.regexp.charAt(i) == ")")
                {
                    this.nfa.addEdge(i, i + 1)

                    //Creating an or option for the bar operator. 
                    let top = stack.pop()
                    if (top[0] == "|")
                    {
                        var close = stack.pop()

                        this.nfa.addEdge(close[1], top[1] + 1)

                        this.nfa.addEdge(top[1], i)
                    }
                }
            }
        }
    }

    /**
     * Returns true if the text is matched by the regular expression.
     *
     * @param  txt the text
     * @return {@code true} if the text is matched by the regular expression,
     *         {@code false} otherwise
     */
    public matches(txt : string) : boolean {

        let dfs = new DFS(this.nfa)
        dfs.computeForVertex(0)

        //Creating array of possible start points for the graph
        let start_state = new Array()
        for (let i = 0 ; i < this.nfa.getV(); i++)
        {
            if (dfs.isReachable(i))
            {
                start_state.push(i)
            }
        }

        //Loops through the @param txt
        //For each character in s recalculates new starting points 
        //If no starting points are string does not match 
        for (let i = 0; i < txt.length; i++)
        {
            let current = txt.charAt(i)
            let matching = new Array()

            //Find the next start states from current 
            for (let j = 0; j < start_state.length; j++)
            {
                if (this.regexp.charAt(start_state[j]) == current || this.regexp.charAt(start_state[j]) == ".")
                {
                    matching.push(start_state[j] + 1)
                }
            }

            //No starting states exist 
            if (matching.length == 0)
            {
                return false; 
            }

            dfs = new DFS(this.nfa)
            dfs.computeForVertices(matching)

            let newArray = new Array()

            //Recalculate starting points 
            for (let j = 0; j < this.nfa.getV(); j++)
            {
                if (dfs.isReachable(j))
                {
                    newArray.push(j)
                }
            }

            start_state = newArray
            
            //If end vertex is reached, goal has been found. 
            if (start_state.includes(this.nfa.getV() - 1))
            {
                return true; 
            }
        }

        //End vertex has never been reached 
    	return false
    }
    
    /**
     *
     * @param rexp the regular expression
     * @param exp the string to match against the expression
     */
    public static match(regexp : string, exp: string) {
        let matcher = new RegExMatcher(regexp)
        console.log("For regexp: " + regexp + " and string: " + exp + " the result is: ")
        console.log(matcher.matches(exp) + "\n")
    }

    public static grep(rexp: string, fileName: string) {
        let re = "(.*" + rexp + ".*)"
        let matcher = new RegExMatcher(re)
        const fs = require('fs')
        const words = fs.readFileSync(fileName, 'utf-8');
        const wordList = words.split(/\r?\n/);
        for (let line of wordList) {
		if (line.length > 0 && matcher.matches(line))
                	console.log(line);
        }
    }
}
