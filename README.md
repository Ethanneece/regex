
This program is a mini-version of regex

First this builds a directed graph given the regex. 
To find the matches depth first search is used through the directed graph

This program can be run through grep or matches

Matches: 
    Used to identify if a certain string is accepted by the regex

Grep: 
    Prints out the lines of a file that matches the regex

Examples of how to run the program are listed in run.sh


# Supported Metacharacters:  

### *:
    matches zero or more expressions. 

### |: 
    matches expression or expression 

### (): 
    groups characters together. 


# Initalize tools 
npm install

# To Build
make

# To Run test. 
make run

# To Clean
make clean
