import React from 'react';
import {Button, FormGroup} from "react-bootstrap";
import {compose, withHandlers, withState} from "recompose";
import _ from 'lodash';

export const FormComponentBase = ({decryptedMsg, validateCryptedMsgLength, cryptedMsgInputText, handleCryptedMsgChanged, handleSubmit, setInputFilesElement, handleFileSelect}) => (
    <form>
        <FormGroup controlId="cryptedText">
            <input ref={setInputFilesElement} onChange={handleFileSelect} type="file" webkitdirectory="true" directory="true"
                   multiple/>
            <Button bsStyle="success" onClick={handleSubmit}>Déchiffrer</Button>
        </FormGroup>
    </form>
);

export default compose(
    withState('cryptedTexts', 'updateCryptedTexts', []),
    withState('inputFilesElement', 'updateInputFilesElement', null),
    withHandlers({
        setInputFilesElement: props => element => {
            props.updateInputFilesElement(element);
        },
        handleFileSelect: props => event => {
            event.preventDefault();
            let files = event.target.files;
            let cryptedTexts = [];

            _.each(files, (file, i) => {
                let reader = new FileReader();
                reader.onloadend = evt => {
                    cryptedTexts.push({name: file.name, cryptedText: evt.target.result});
                    if (cryptedTexts.length === files.length) {
                        props.updateCryptedTexts(cryptedTexts);
                    }
                }
                reader.readAsText(file);
            });
        }
    }),
    withHandlers({
        handleSubmit: props => event => {
            event.preventDefault();
            if (props.cryptedTexts.length > 0) {
                props.findKey(props.cryptedTexts);
            }
        }
    })
)(FormComponentBase)