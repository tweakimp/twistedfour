# to do

### game play


### game rules
- [ ] detect draws when board is full or both players get a line of four tokens at the same time

### ui
- [ ] show whose move it is 
- [ ] show how much time is left

### ai
- [ ] name
- [ ] functions that help the AI
- [ ] rate game state >> return a number between 1 (player 1 wins 100%) and 2 (player 2 wins 100%)

### improvements
- [ ] modulate everything

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
- [x] if you twist the board after some turns, the next moves and the history get messed up
- [x] add restart
- [x] allow only legal moves for human player
- [x] apply heuristic to rate a game state