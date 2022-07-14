import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import configData from "../config.json";

class CameraStat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Camera status will be displayed here.'
        };
        console.log(configData.Camera_Broadcast_Topic)
    }

    render() {
        return (
            <label>
                <textarea id="statusarea" name="status"
                    rows="15" cols="40" defaultValue={this.state.value} />
            </label>
        );
    }
}

export default CameraStat;
