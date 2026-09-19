import React, { useEffect, useRef, useState } from 'react';

import { DosPlayer as Instance, DosPlayerFactoryType } from 'js-dos';

declare const Dos: DosPlayerFactoryType;

interface PlayerProps {
    width: number;
    height: number;
    bundleUrl: string;
}

export default function DosPlayer(props: PlayerProps) {
    const rootRef = useRef<HTMLDivElement>(null);

    const [dos, setDos] = useState<Instance | null>(null);

    useEffect(() => {
        if (rootRef === null || rootRef.current === null) {
            return;
        }

        const root = rootRef.current as HTMLDivElement;
        const instance = Dos(root);

        setDos(instance);
        const elements = rootRef.current.getElementsByClassName('flex-grow-0');

        while (elements.length > 0) {
            elements[0].remove();
        }

        // js-dos never makes its canvas focusable, so keypresses land on <body>
        // and never reach the emulator. Make it focusable and grab focus on click.
        const focusCanvas = () => {
            const canvas = root.querySelector('canvas');
            if (canvas) {
                canvas.setAttribute('tabindex', '0');
                (canvas as HTMLCanvasElement).focus();
            }
        };
        const observer = new MutationObserver(focusCanvas);
        observer.observe(root, { childList: true, subtree: true });
        root.addEventListener('mousedown', focusCanvas);

        return () => {
            observer.disconnect();
            root.removeEventListener('mousedown', focusCanvas);
            instance.stop();
        };
    }, [rootRef]);

    useEffect(() => {
        if (dos !== null) {
            dos.run(props.bundleUrl);
        }
    }, [dos, props.bundleUrl]);
    return (
        <div
            ref={rootRef}
            style={{
                width: props.width,
                height: props.height,
                position: 'absolute',
            }}
        ></div>
    );
}
