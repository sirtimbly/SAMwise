# SAM and Mithril in TypeScript boilerplate app

Features ultra-small dependencies. And lots of functional rendering control. No templating here. For when you want a purely programatic UI rendering and need to keep things organized according to some convention.

- [Mithril](http://mithril.js.org/) is 8kb gzipped and has a good fast virtualdom implementation as well as a request library. 
- Hand-built low-level [SAM architecture](http://sam.js.org/) in TypeScript keeps things organized and easy to write. 
- A small css library combining [Basscss](http://basscss.com/) and [lotus](http://goatslacker.github.io/lotus.css/) gives you very lightweight (4kb gzipped) declarative styling utility classes.
- Drastically reduced set of fontawesome icons weighs in less than 10k.



## Getting Started

Clone this repository locally and update the package.json details.

`npm install`

`npm run start`

Then you can open [localhost:8080](http://localhost:8080) and you will have live reloading already set up.

## Organization and Development Paradigm

I like to think this architecture is useful for progressively enhanced apps, where you want to very surgically replace parts of your webpage with reactive, virtualdom components. The other goal is to rely on the minimum size of dependencies, so you lose things like templating languages and pre-defined UI components. 

I also like the conventions from Atomic Design by Brad Frost. So, when you need to share UI elements between screens you can break them down by Atom, Molecule, or Organism.

When you need to refactor a HTML tag into something reusable you export a pure rendering function from `src/components/UIAtoms.ts`. These should be ignorant of any of the implementation details of the data model or the actions that they might be calling when the user interacts with them.

## Actions and State
The core of the logic is contained in one file `src/app.ts`, where you specify your Actions (when the UserAgent causes and event that needs to change the model data of the app), your State Rendering functions, and your complex high-level user interface screens (which are Mithril components which contain a view function and are in some way coupled to the state or the model).

All of these things are tightly coupled and have to know about each other, but following the SAM architecture they only flow in one direction using functions that are passed through.

The actions should be responsible for making calls to any APIs or data persistence mechanisms (like PouchDB) then sending updates through the model.

## Models
I usually keep my model in a seperate file, but if it's small and simple it can be in that same app.ts file. The model is responsible for exposing methods that will patch the model data and take care of any data validation. The appropriate state rendering function is passed on to these model functions as a parameter.

Take a look at `src/samwise/index.ts`


![A diagram of the flow](http://uploads.timbendt.com.s3.amazonaws.com/dropzone/SAM%20Mithril-1.png)

## Actually rendering it into a page

At the bottom of the app.ts file I have a call to a special LoadAction which does the initial loading of the data model and rendering for the first time. All future changes to the dom will be triggered by dom events that call actions that call the model.


### TODO

- [ ] better production builds
- [ ] automatic minification of CSS or SCSS
- [ ] cleaner organization of the app.ts file
- [ ] recommended Unit testing and UI render testing
- [ ] todo app example
