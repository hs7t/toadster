# toadster

toadster is a pretty fun Discord bot! It has a few commands:

- `/bzz` - replies with 'ribbit'
- `/fetch` - fetches an item for you
- `/pen` - lets you write toadster a letter
- `/soothsay` - tells you what the future holds
- `/answer` - responds to a query using the Wolfram Alpha Short Answers API
- `/define` - defines a word using dictionaries from Merriam-Webster and Urban Dictionary
- `/frame` - frames a message
- `/binary` - turns text into ones and zeroes
- `/rotate` - rotates all letters in some text
- `/funky` - gIvEs yOu tExT lIkE tHiS

## Running a toadster instance

### Downloading
Clone this repository:

```bash
git clone https://github.com/hs7t/toadster.git
```

Then, run:
```bash
npm install 
```

> [!NOTE]
> You'll need Node.js to run toadster.

### Setting up
Toadster needs two configuration files:
1. identity.json:
    ```json
    {
        "token": "<DISCORD-BOT-TOKEN>",
        "clientId": "<DISCORD-CLIENT-ID>",
    }
    ```
2. secrets.json:
    ```json
    {
        "merriamwebster": {
            "dictionary": {
                "key": "<MERRIAM-WEBSTER-COLLEGIATE-DICTIONARY-API-KEY>"
            },
            "thesaurus": {
                "key": "<MERRIAM-WEBSTER-COLLEGIATE-DICTIONARY-API-KEY>"
            }
        },
        "wolframalpha": {
            "shortanswers": {
                "key": "WOLFRAM-ALPHA-SHORT-ANSWERS-API-APP-ID"
            }
        }
    }
    ```
They should be located in the main folder (the folder where `index.js` is located).

### Starting toadster
It's pretty easy! From the main folder, run:

```bash
npm start
```

Or, if you can't spare a few seconds and toadster's commands have already been registered:
```bash
node index.js
```