##to do##

**GAMEPLAY**  
- make moves, start at all zeroes
- twist functions
- write a history "player 1, player 2"-array of what moves have been made so far


**GAME RULES**  
 - what happens when both players connect 4 after a twist?

**UI**
- color fields in player color
- show whose move it is
- show how much time it is
- add "start new game" button with time option
 
**KI**  
- functions that help the AI
- getGameState >> return matrix
- getLastMove >>	return column (0-6) or turn left or turn right
- rate game state >> return a number between 1(player 1 wins 100%) and 2(player 2 wins 100%)
- heuristic used to evaluate a game state is:
- count of ia's four-in-row * 1000 + count of ia's three-in-row * 100 + count of ia's two-in-row * 10 - count of human's three-in-row * 100 - count of human's two-in-row * 10 + current depth of tree.
- python formula: (ia_fours * 100000 + ia_threes * 100 + ia_twos * 10) - (human_threes * 100 + human_twos * 10) + depth

**CODE**
- class objects
- split up file with "import"
- recognize column amd row wins with more than four connected