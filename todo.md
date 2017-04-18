# to do
### game play
- [ ]  mouse over column

### game rules
- [ ] what happens when both players connect 4 after a twist?

### ui
- [ ]  show whose move it is 
- [ ]  show how much time is left
- [ ]  add "start new game" button with time option
- [ ]  options who plays first, what kind of players play and what ai difficulry is chosen  

### ai
- [ ]  name
- [ ]  functions that help the AI
- [ ]  rate game state >> return a number between 1(player 1 wins 100%) and 2(player 2 wins 100%)  
- [ ]  heuristic used to evaluate a game state is:

```
(ia_fours * 100000 + ia_threes * 100 + ia_twos * 10) - (human_threes * 100 + human_twos * 10) + depth
```

### improvements
- [ ] give every field a unique id
- [ ] modulate everything

### bugs
- [ ] legal moves doesnt get reduced when row is full

# done
- [x] get rid of += className
- [x] color fields in player color
- [x] make moves, start at all zeroes
- [x] twist functions
- [x] write a history "player 1, player 2"-array of what moves have been made so far
- [x]  getLastMove >>	return column (0-6) or turn left or turn right  
