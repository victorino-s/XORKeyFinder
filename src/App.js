import React from 'react';
import './App.css';
import {decrypt, toAscii, toBinary, xor} from "./Utils";
import _ from 'lodash';
import FormComponent from "./FormComponent";
import ResultsComponent from './ResultsComponent';
import {compose, withHandlers, withState} from "recompose";

const AppBase = props => (
    <div id="projet-crypto-appcontainer">
        <FormComponent findKey={props.findKey}/>
        <ResultsComponent results={props.results}/>
    </div>
);

const mostUsedCharacters = [
    ' ',
    'e',
    'a',
    'i'
];

export default compose(
    withState('results', 'updateResults'),
    withHandlers({
        findKey: props => messages => {
            let potentialResults = [];

            _.each(mostUsedCharacters, char => {
                _.each(messages, message => {
                    let testKey = '';

                    for (let i = 0; i < props.keyLength; i++) {

                        let letters = [];
                        // Comptage des différentes lettres utilisées dans le message, pour la colonne 'i' de la clé
                        for (let x = i; x < message.cryptedText.length; x += props.keyLength) {
                            const row = _.find(letters, o => o.letter == message.cryptedText[x]);
                            if (!_.isNil(row)) {
                                row.count++;
                            } else {
                                letters.push({letter: message.cryptedText[x], count: 1});
                            }
                        }

                        letters = _.orderBy(letters, ['count'], ['desc']);

                        const mostUsedSymbol = letters[0].letter;
                        testKey += toAscii(xor(toBinary(mostUsedSymbol), toBinary(char)));
                    }

                    const n = decrypt(testKey, message.cryptedText);

                    if (n.valid) {
                        potentialResults.push({key: testKey, text: n.message, file: message.name});
                    }
                })
            });
            props.updateResults(potentialResults);
        }
    })
)(AppBase);
