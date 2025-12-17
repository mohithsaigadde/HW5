# Scrabble One-Line Board  
GUI I — Homework 5  
Author: Mohith Sai Gadde  
Student ID: 02209215  
Email: MohithSai_Gadde@student.uml.edu  

---

## Project Overview  
This project implements a one-line version of the Scrabble game using HTML, CSS, JavaScript, jQuery, and jQuery UI.  
The user is given seven randomly selected letter tiles and can drag and drop them onto a single row of a Scrabble board.  
The program calculates the score of the placed word, taking into account bonus squares and letter values.

The project demonstrates the use of data structures, drag-and-drop functionality, dynamic UI updates, and score calculation logic.

---

## Features Implemented  

### 1. Tile Distribution and Random Dealing  
The tile bag contains the official Scrabble tile distribution with correct quantities and values.  
Seven tiles are dealt to the rack at the beginning and after each valid word is played.  
The number of remaining tiles is always displayed and updated.

### 2. Drag-and-Drop Tile Placement  
Tiles can be dragged from the rack and dropped on any square of the board.  
Tiles dropped outside valid areas return to the rack.  
Tiles placed on the board can be dragged back to the rack.

### 3. Board Layout and Alignment  
The one-line board layout is aligned accurately with the background PNG.  
Each board square is sized and positioned so the player tiles appear exactly on top of the printed squares.  
Bonus squares, including double-word and double-letter spaces, match their positions on the background image.

### 4. Word Scoring  
Placed tiles must form a contiguous word with no gaps between tiles.  
Letter multipliers and word multipliers are applied correctly.  
The current word score is shown, and after playing a word, it is added to the total score.

### 5. Game Flow and Reset  
After a word is played, tiles on the board are removed and new tiles are dealt.  
The game continues until tiles run out.  
The restart button resets all tiles, the board, the score, and the tile bag to the initial state.

---

## File Structure  
index.html - Main layout and board structure
style.css - Board, tile, rack, and layout styling
script.js - Game logic and drag-and-drop functionality
graphics_data/ - Tile images and board background