import React from 'react';
import {PanelGroup} from "react-bootstrap";
import _ from 'lodash';
import ResultRowComponent from "./ResultRowComponent";

export default (results) => (
    <PanelGroup accordion defaultActiveKey="1" id="results-panel">
        {
            !_.isNil(results.results) ?
                _.map(results.results, (row, i) => <ResultRowComponent key={i} keyId={i} fileName={row.file} keyFound={row.key} message={row.text} />)
                :
                null
        }
    </PanelGroup>
)