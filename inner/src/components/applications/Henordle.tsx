import React from 'react';
import Window from '../os/Window';
import Wordle from '../wordle/Wordle';

export interface JamordleAppProps extends WindowAppProps {}

const JamordleApp: React.FC<JamordleAppProps> = (props) => {
    return (
        <Window
            top={20}
            left={300}
            width={600}
            height={860}
            windowBarIcon="windowGameIcon"
            windowTitle="Jamordle"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'© 2026 Jamie Ledesma'}
        >
            <div className="site-page">
                <Wordle />
            </div>
        </Window>
    );
};

export default JamordleApp;
