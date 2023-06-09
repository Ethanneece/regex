tsc = ./node_modules/typescript/bin/tsc

build:
	$(tsc) -outFile Reg.js @files.txt
run:
	./run.sh
clean:
	@rm -rf *.js
