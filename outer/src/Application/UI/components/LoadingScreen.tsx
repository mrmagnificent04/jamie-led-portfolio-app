import React, { useCallback, useEffect, useState } from 'react';
import eventBus from '../EventBus';

type LoadingProps = {};

const LoadingScreen: React.FC<LoadingProps> = () => {
    const [progress, setProgress] = useState(0);
    const [overlayOpacity, setLoadingOverlayOpacity] = useState(1);
    const [doneLoading, setDoneLoading] = useState(false);
    const [webGLError, setWebGLError] = useState(false);
    const [mobileWarning, setMobileWarning] = useState(window.innerWidth < 768);

    useEffect(() => {
        const onResize = () => setMobileWarning(window.innerWidth < 768);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        if (!detectWebGLContext()) setWebGLError(true);
    }, []);

    useEffect(() => {
        eventBus.on('loadedSource', (data) => {
            setProgress(data.progress);
        });
    }, []);

    useEffect(() => {
        if (progress >= 1 && !webGLError) {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('debug')) {
                start();
                return;
            }
            setDoneLoading(true);
        }
    }, [progress, webGLError]);

    const start = useCallback(() => {
        setLoadingOverlayOpacity(0);
        eventBus.dispatch('loadingScreenDone', {});
        const ui = document.getElementById('ui');
        if (ui) {
            ui.style.pointerEvents = 'none';
        }
    }, []);

    const detectWebGLContext = () => {
        const canvas = document.createElement('canvas');
        const gl =
            canvas.getContext('webgl') ||
            canvas.getContext('experimental-webgl');
        return !!(gl && gl instanceof WebGLRenderingContext);
    };

    if (webGLError) {
        return (
            <div style={Object.assign({}, styles.overlay, { opacity: 1 })}>
                <div style={styles.center}>
                    <p style={styles.title}>WebGL required</p>
                    <p style={styles.subtle}>
                        Please enable WebGL or switch to a browser that supports
                        it.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            style={Object.assign({}, styles.overlay, {
                opacity: overlayOpacity,
                pointerEvents: overlayOpacity === 0 ? 'none' : 'auto',
            })}
        >
            <div style={styles.center}>
                <p style={styles.title}>Jamie's Portfolio (2026)</p>

                <div style={styles.track}>
                    <div
                        style={Object.assign({}, styles.bar, {
                            width: `${Math.round(progress * 100)}%`,
                        })}
                    />
                </div>

                {doneLoading ? (
                    <div className="bios-start-button" onClick={start}>
                        <p>ENTER</p>
                    </div>
                ) : (
                    <p style={styles.subtle}>Loading</p>
                )}

                {mobileWarning && (
                    <p style={styles.warning}>Best viewed on a desktop.</p>
                )}
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    overlay: {
        backgroundColor: '#000',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'opacity 0.4s ease-in-out',
        boxSizing: 'border-box',
        padding: 24,
        fontSize: 16,
        letterSpacing: 0.8,
    },
    center: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: 260,
    },
    title: {
        color: '#fff',
        marginBottom: 20,
    },
    track: {
        width: '100%',
        height: 2,
        backgroundColor: '#333',
        marginBottom: 20,
    },
    bar: {
        height: '100%',
        backgroundColor: '#fff',
        transition: 'width 0.2s linear',
    },
    subtle: {
        color: '#888',
    },
    warning: {
        color: '#888',
        marginTop: 24,
        textAlign: 'center',
    },
};

export default LoadingScreen;
