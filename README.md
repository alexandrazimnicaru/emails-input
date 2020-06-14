# Email Editor

The emails input library creates a list of emails.

It adds an email when the user presses enter, types a separating comma or blurs the input field. It can also add multiple emails, when pasting a comma separated list into the input field. It removes individual emails when clicking on their remove icon.

In addition, the library validates the input values and offers a button to count the number of valid emails.

It also offers a button to add a randomly generated email.

## Installation

Please make sure you're using node 10 or above. Simply run `yarn install` or `npm install` in the root library folder.

You can then run the project with `yarn start` or `npm start`.

## Usage
The index.html file in the root folder serves as an example of how to include the library in a project.

Load the index.js file from the dist folder into your project. This will make `EmailsInput` globally available.

To use it simply call `EmailsInput` on an HTML element like in the example bellow:

```
<script>
var exampleEl = document.getElementById('emails-input');

var exampleEmailsInput = EmailsInput(exampleEl);
</script>
```

To make the lib styles available, load the index.css file from the dist folder into your project.

## Development

`yarn start` uses [ParcelJS](https://parceljs.org/) and [Typescript](https://parceljs.org/) to compile the js into browser compatible JavasScript and to bundle it. Parcel also uses node-sass to process scss into browser readable css.

During development, you can check the dist folder to see the current js and css bundles (and source maps), which have hashed names.

## Build

Run `yarn build` or `npm run build`. The commands will first empty the dist folder, then generate the production ready js & css bundles (merged, minified, uglified etc). Note that in order to be able to include these bundles as a library in any other project, their names aren't hashed.

## Testing

Run `yarn test` or `npm test`. The app uses karma as its test runner and jasmine as its testing framework.

## Linting

Run `yarn lint` or ```npm run lint```. The app uses eslint and the typescript-eslint parser with a recommended configuration.
