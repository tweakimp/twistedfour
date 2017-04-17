# to do
**GAMEPLAY**  
- mouse over columns

**GAME RULES**  
- what happens when both players connect 4 after a twist?

**UI**

- show whose move it is 
- show how much time it is  
- add "start new game" button with time option  
 
**KI**  
- name
- functions that help the AI  
- getGameState >> return matrix  
- getLastMove >>	return column (0-6) or turn left or turn right  
- rate game state >> return a number between 1(player 1 wins 100%) and 2(player 2 wins 100%)  
- heuristic used to evaluate a game state is:



```
> Python
(ia_fours * 100000 + ia_threes * 100 + ia_twos * 10) - (human_threes * 100 + human_twos * 10) + depth
```


**CODE**  


**IMPROVEMENTS**  
- give every field a unique id

**BUGS**


# done
- get rid of += className
- color fields in player color
- make moves, start at all zeroes
- twist functions
- write a history "player 1, player 2"-array of what moves have been made so far
