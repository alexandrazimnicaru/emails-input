# Email Editor

The emails input library creates a list of emails.

It adds an email when the user presses enter, types a separating comma or blurs the input field. It can also add multiple emails, when pasting a comma separated list into the input field. It removes individual emails when clicking on their remove icon.

In addition, the library validates the input values and offers a button to count the number of valid emails.

It also offers a button to add a randomly generated email.

## Installation

I need to maybe make a package to install.

## Usage
Load the index.js from the dist folder into your project. This will make ```EmailsInput``` globally available.

To use it simply call ```EmailsInput``` on an HTML element like in the example bellow:

```
<script>
var exampleEl = document.getElementById('emails-input');

var exampleEmailsInput = EmailsInput(exampleEl);
</script>
```

To make the lib styles available, load the index.css from the dist folder into your project.

## Development

Please make sure you're using node 10 or above. Simply run ```yarn install``` or ```npm install``` in the root library folder.

You can then run the project with ```yarn start``` or ```npm start```.

## Testing

Run ```yarn test``` or ```npm test```.

## Linting

Run ```yarn lint``` or ```npm run lint```.
