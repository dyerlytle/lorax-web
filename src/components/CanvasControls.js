import React from 'react';
import Canvas from "./Canvas";
import {
    Button
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import im1 from "../assets/images/dumbbell-bw.jpg";

function CanvasControls() {

    var childRef = React.useRef(null);

    React.useEffect(() => {
        updateCanvas();
    }, [])

    const updateCanvas = () => {
        const ctx = childRef.current.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        const width = childRef.current.width;
        const height = childRef.current.height;
        var image1 = new Image();
        image1.src = im1;
        image1.onload = function () {
            var hRatio = width / image1.width;
            var vRatio = height / image1.height;
            var ratio = Math.min(hRatio, vRatio);
            ctx.drawImage(image1, 0, 0, image1.width, image1.height,
                0, 0, image1.width * ratio, image1.height * ratio);
        }
    }

    return (
        <div >
            <div id="currentimagetitle">
                <h5> Current Image</h5>
            </div>
            <div id="cdiv">
                <Canvas forwardedRef={childRef} />
            </div>
            <div id="navi">
                <Button variant="outline-danger" size="sm"
                    style={{ width: "30px", height: "30px" }}>+</Button>
                <br></br>
                <Button variant="outline-danger" size="sm"
                    style={{ width: "30px", height: "30px" }}>-</Button>
            </div>
        </div>
    );

}

export default CanvasControls;
