# to do
### game play


### game rules
- [ ] what happens when both players connect 4 after a twist?

### ui
- [ ] show whose move it is 
- [ ] show how much time is left
- [ ] add restart


### ai
- [ ] name
- [ ] functions that help the AI
- [ ] rate game state >> return a number between 1 (player 1 wins 100%) and 2 (player 2 wins 100%)
- [ ] heuristic used to evaluate a game state is:
```
	(aiFours * 100000 + aiThrees * 100 + aiTwos * 10) -	(humanThrees * 100 + humanTwos * 10) + depth
```
### improvements
- [ ] modulate everything
- [ ] ai next turn in one function prevent double code in game.js:76

### bugs

# done
- [x] get rid of += className
- [x] color fields in player color
- [x] make moves, start at all zeroes
- [x] twist functions
- [x] write a history "player 1, player 2"-array of what moves have been made so far
- [x] getLastMove >> return column (0-6) or turn left or turn right 
- [x] legal moves doesnt get reduced when row is full
- [x] give every field a unique id
- [x] add "start new game"
- [x] connect start game with start button and dropdown menus in html
- [x] highlight winning fields
- [x] mouse over column