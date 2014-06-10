# Uber Sudoku Game

A sudoku game is an open ended requirement, especially from a UE perspective. Should the user get immediate feedback when a move is not valid, let alone correct? Should a list of valid moves be shown in the cells? Should the user be able to annotate cells?

## Features

This is a simple Sudoku game implementation. There’s a catalog of games that are accessible by clicking “New Game”. Entering values is a matter of selecting a sell and entering a value. When all cells are filled in and valid, the game is complete.


## Feature Compromises

Given that I had a limited time frame, a full-time job and a fairly busy weekend, I had to limit the scope. Beyond architectural compromises, I cut several features I would have liked to included, not limited to the following:

1. Selecting games from a list
2. Auto-completing games
3. Functional tests with a solver
4. Random game generation
5. Warnings when the "reset" or "new game" buttons are pressed
6. "Landscape" mode for tablets and mobile devices
7. Retaining game progress across browser sessions
8. Retaining status (failures, time, mistakes)
9. More flexible game-board size


## JavaScript Architecture

I used a Yeoman generator to quickly scaffold out the basic setup. The “app” directory contains the application assets, and the “test” directory contains a couple simple tests for board generation. I used requirejs for modularity and Handlebars for templating. Yeoman provided a basic Gruntfile that I pared down a bit because I didn’t feel I needed a “dist” build for this exercise.

While I wasn‘t allowed to use an MV* framework, I went ahead and implemented a simple pub/sub mechanism in app.js, which also maintains some global state, and used some other Backbone conventions like “render”.

### Views
The “views” directory contains the various UI elements, although in this case I left a decent portion in index.html rather than creating a global template because there wasn‘t going to be a reason to rerender everything.

I set up events to delegate to views/game.js to keep event handling in a common place, but in the case of determining which cell was clicked, I wanted to retain the logic in board.js so that cell detection was inside of the board view. In retrospect this doesn’t really matter.

### Templates
The “templates” directory contains the handlebars templates used by the views. Handlebars is a bit of an overkill here, but the requirejs Handlebars plugin is easy to plug in, so it made sense to use for simplicity’s sake.


### Models
The “models” directory contains the two core models: board, and cell.


### Event-driven
As much as possible, I wanted the architecture to be event driven via a global pub-sub mechanism. Since I didn't set up automatic event triggering on model mutation (mostly because I didn't want to rewrite _all_ of backbone, I relied on the model itself to decide whether to send events.

### CSS Architecture
I used SASS and autoprefixer to make writing CSS simple and fast. I separated styling out into some separate files.

Because this is such a simple program visually, I didn’t spend as much time as I possibly should have to consider widget abstraction and CSS reuse. In some cases I used IDs in selectors and ran into some specificity conflicts. In the face of a lack of clear need for reusability, I try to make code refactorable rather than perfect the first time.

I would have liked to make the table scale with the screen size a little better and, not being a visual designer, I’m not too happy with the colors.

## UE Considerations

I decided that the native keyboard for mobile devices was going to be a usability problem. To avoid this, I instead used an on-screen keyboard for all devices and chose not use an input element in each cell. Users select a cell and then click the numbers at the bottom of the screen. Users with physical keyboards can still type numbers if they choose.

## Running it

Assumptions: You already have npm and bower installed.

### Install dependencies

In the root directory, run

  npm install
  bower install
  cd test && bower install && cd ..

### Run the server

  grunt serve

## Application Notes

I set the default game to be almost complete to demonstrate the success mode (rather than forcing you to play a full game. Just enter 5 and you’ll win.

Clicking “New Game” will select a new, different game.


## Other notes

I grabbed the Sudoku games from Project Euler rather than generating them.
