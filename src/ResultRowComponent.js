import React from 'react';
import {Panel} from "react-bootstrap";

export default ({keyId, fileName, keyFound, message}) => (
    <Panel eventKey={keyId}>
        <Panel.Heading>
            <Panel.Title toggle>{`Key #${keyId} : ${keyFound}`}</Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>
            <div>
                <p>Nom du fichier = {fileName}.</p>
                <p>Message obtenu :</p>
                <p>{message}</p>
            </div>
        </Panel.Body>
    </Panel>
)