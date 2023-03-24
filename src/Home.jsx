import {Canvas} from '@react-three/fiber';

import React, {Suspense} from 'react'
import { useNavigate } from 'react-router-dom';

import './Home.css';
import {Earth} from './Earth';

export default function Home() {

    const navigate = useNavigate();

    function handleClick(){
        navigate('/Map')
    }

    return (
    <div className='canvas'>
        <div className='Container'>
        <h1 className='title'>Project Waste</h1>
        <h4 className='slogan'>Trash talk never looked so good!</h4>
        <p className='description'>
            The project displays Eurostat data on 
            recycling rates, waste production per capita, 
            and renewable energy usage percentages for various European countries. 
            The data is visualized on a map, 
            allowing users to compare the environmental sustainability of different regions at a glance.
            <br></br>
            <br></br>
            The user can select from the top left dropmenu the data that he wants to visualize on the map. 
            The legend updates aswell providing information of what the user sees each time. 
            Also by clicking on each country displayed on the map he gets more information about the data that is provided.
            <br></br>
            <br></br>
            Click the button and get started!
        </p>
        <button className='NavigateButton' onClick={handleClick}>See map</button>
        </div>
        <Canvas>
            <Suspense fallback={null}>
              <Earth/>
            </Suspense>
        </Canvas>
    </div>
    )
}
