# Todo App with Vue and TS

PawaTask is a task manager that uses you localStorage capabilites to power a task list

See the demo at https://pawatask.now.sh/

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

## Design decisions

### localStorage
Vuex has an interesting plugin that will let you persist your data with no trouble in the localStorage, this was a plug-and-play setting that enabled the project to move forward without the need of a database.

I used the UUID generator to create the identifiers for each element, so we can point to a TASK without the fear of duplication since we don't have a powerful database backbone.

### Moment dependency
With the project heavily using dates and having dates in human notation the most useful dependency I could though of was Moment.js. 

To make it lighter I removed the locales using Webpack.IgnorePlugin.

### Modal dependency
Having an X in the top right of the edit, view and add screens was an indicator that they were modals. I did some modals, including in Vue, but decided to not create one new modal and use the well-known vue-modal.

### Unit tests
I tested all the components and tried to cover the most sensitive parts of it. I did not test the helpers nor the containers.

### Lint
I used the standard - https://standardjs.com/ - so we don't have, for example, semicolon.

## Changes made
I know there are no requirements on both of the following items, but it seemed a natural and a great fit to the "Bonus"

### Name on comment form
I had to add a field to the comment form, without it would not be possible to have names related to comments. Nameless comments will be treated as Anonymous.

### Select multiple
I used the box on the task item to create a multiple task selector, so the user can delete all the selected tasks.

It has much more to be done. But for this test, I had to define a line, so that's it.
