import React from 'react';
import ThreeD from "./ThreeD";
import CanvasControls from "./CanvasControls";
import ICNavbar from "./ICNavbar";
import MountStat from './MountStat';
import CameraStat from './CameraStat';
import DomeStat from './DomeStat';
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';
import './styles.css';

import 'bootstrap/dist/css/bootstrap.min.css';


function MainPage() {

    return (
        <Container fluid style={{ width: "98%", height: "100%" }}>
            <ICNavbar />

            {/* Add a little space at the top, below the Navbar, above the Grid. */}
            <Row style={{ marginLeft: 0, marginRight: 0 }} ><p /></Row>

            {/* This is the Bootstrap Grid layout. */}
            <Row style={{ marginLeft: 0, marginRight: 0 }} >
                <Col md="auto"><MountStat /></Col>
                <Col md="auto"><CameraStat /></Col>
                <Col md="auto"><DomeStat /></Col>
            </Row>
            <Row style={{ marginLeft: 0, marginRight: 0 }} >
                <Col ><ThreeD /></Col>
                <Col ><CanvasControls /></Col>
            </Row>
        </Container >
    )
}

export default MainPage;