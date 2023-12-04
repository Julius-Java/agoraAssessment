"use client";
import React, { useEffect, useState } from "react";
import { AgoraRTCProvider } from "agora-rtc-react";
import { type IAgoraRTCClient } from "agora-rtc-sdk-ng";
import VideoPlayer from "./VideoPlayer";

const appID = process.env.NEXT_PUBLIC_APP_ID;
const channelName = process.env.NEXT_PUBLIC_CHANNEL_NAME;
const token = process.env.NEXT_PUBLIC_APP_TOKEN;

function CallRoom() {
    const [agoraClient, setAgoraClient] = useState<IAgoraRTCClient>();
    const [render, setRender] = useState(false);
    // const [AgoraProvider, setAgoraProvider] =
    //     useState<typeof AgoraRTCProvider>();
    useEffect(() => {
        if (window) {
            const initSdk = async () => {
                const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;
                // const AgoraRTCReact = await import("agora-rtc-react");
                const client = AgoraRTC.createClient({
                    mode: "live",
                    codec: "vp8",
                });
                setAgoraClient(client);
                setRender(true);
                // setAgoraProvider(AgoraRTCReact.AgoraRTCProvider);
            };

            initSdk();
        }
    }, []);

    // if (!agoraClient || !AgoraProvider) return <div>Loading...</div>;

    if (!agoraClient || !render) return <div>Loading...</div>;

    return (
        <AgoraRTCProvider client={agoraClient}>
            <VideoPlayer
                channelName={channelName}
                appID={appID}
                token={token}
                client={agoraClient}
            />
        </AgoraRTCProvider>
    );
}

export default CallRoom;
