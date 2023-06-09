echo ""
echo grep "spb" ./tests/test1.txt
node Reg.js grep "spb" ./tests/test1.txt
echo ""
echo grep "(a*b|ac)d" ./tests/test2.txt
node Reg.js grep "(a*b|ac)d" ./tests/test2.txt
echo ""
echo grep "((HI)|(pr))" ./tests/test3.txt
node Reg.js grep "((HI)|(pr))" ./tests/test3.txt
echo ""
echo grep "(good|bad) (apples|oranges)" ./tests/test4.txt
node Reg.js grep "(good|bad) (apples|oranges)" ./tests/test4.txt
echo ""
echo grep "(0|1)*1(0|1)*1(0|1)*1" ./tests/test5.txt
node Reg.js grep "(0|1)*1(0|1)*1(0|1)*1" ./tests/test5.txt
