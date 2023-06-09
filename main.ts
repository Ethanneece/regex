var action = process.argv[2]
if (action === "match")
	RegExMatcher.match(process.argv[3], process.argv[4])
else if (action === "grep")
	RegExMatcher.grep(process.argv[3], process.argv[4])
else
	console.log("unknown action: " + action)
