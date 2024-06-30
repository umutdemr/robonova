import React, { useEffect, useRef } from 'react';
import { HttpAgent } from '@dfinity/agent';

const PlaygroundIntegration = () => {
    const iframeRef = useRef(null);
    const PLAYGROUND_ORIGIN = 'https://play.motoko.org';
    const APP_ID = 'MyEditor';

    useEffect(() => {
        // HttpAgent'ı yapılandır
        const host = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://ic0.app';
        const agent = new HttpAgent({ host });

        // Listen for messages from the iframe
        const receiveMessage = (event) => {
            if (event.origin === PLAYGROUND_ORIGIN && typeof event.data === 'string' && event.data.startsWith(APP_ID)) {
                const response = JSON.parse(event.data.substring(APP_ID.length));
                if (response.type === 'code') {
                    console.log('User code:', response.payload.code);
                }
            }
        };

        window.addEventListener('message', receiveMessage);

        // Clean up the event listener
        return () => {
            window.removeEventListener('message', receiveMessage);
        };
    }, []);

    const getCodeFromIframe = () => {
        if (iframeRef.current) {
            const userCode = iframeRef.current.contentWindow.getCode();
            console.log('User code from iframe:', userCode);
        }
    };

    return (
        <div>
            <button onClick={getCodeFromIframe}>Get Code</button>
            <iframe
                ref={iframeRef}
                src={`${PLAYGROUND_ORIGIN}?post=${APP_ID}`}
                width="100%"
                height="500"
                style={{ border: 0 }}
                title="Motoko Playground"
                sandbox="allow-same-origin allow-scripts"
            />
        </div>
    );
};

export default PlaygroundIntegration;
