////////////////////////////////////////////////////////////////
// Title: KanbanBoard
// Author: Denis Kosogov
// Date: 2/26/2023

// Notes: When approaching this problem I could think of three
// different approaches.

// 1. The easiest and perhaps the cleanest approach would be to use
// an external library such as beautiful-dnd. This would yield clean
// animations, easy to setup. However, this approach may lead to
// problems in the future with potential depreciations of the
// library, since we are dependent on it.

// 2. Second approach is the one I took, by utilizing the build in
// HTML5 Api for drag and drop we are able to recreate a similar
// functionality. We would however lack cool animations, and certain
// features, which could be implemented using CSS and javascript.

// 3. The third approach would be to create custom javascript
// to handle any and all of the functionality we might want. This may
// be the best approach but is also the most tedious and complex one.

// I have decided to split the application into two components. The
// board it self which handles most of the logic behind the app. and
// the task component which represents a single task. We could also
// have create a separate component for a taskList, but since this
// is not a complex app, I did not see a reason to do so. As mentioned
// in the comments, I could have created a separate utils folder to
// handle some of the functions, but they are only used once, so
// there was no need for that. I decided to use tailwind for the styling.
// Lastly it would probably be better to use a state management library
// such as redux or react context to manage the state globally instead of
// passing props.
////////////////////////////////////////////////////////////////
