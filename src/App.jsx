import React, { Component } from 'react';
import Sound from "react-sound";
import Music from "../src/sound/cantec.mp3"
import Game from './Game';



class App extends Component {
    

    
    render() { 
        return ( 
            <div>

                <Game/>
                
            </div>
         );
    }
}
 
export default App;