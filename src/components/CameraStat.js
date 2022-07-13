import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

class CameraStat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Camera status will be displayed here.'
        };
    }

    render() {
        return (
            <form>
                <label>
                    <textarea id="statusarea" name="status"
                        rows="15" cols="40" value={this.state.value} />
                </label>

            </form>
        );
    }
}

export default CameraStat;