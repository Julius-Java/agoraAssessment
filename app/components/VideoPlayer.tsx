// VideoPlayer
"use client";
import { useEffect, useState } from "react";
import {
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useJoin,
    useRemoteAudioTracks,
    useRemoteUsers,
    LocalVideoTrack,
    RemoteVideoTrack,
    RemoteUser,
} from "agora-rtc-react";
import { type IAgoraRTCClient } from "agora-rtc-sdk-ng";
import CallControls from "./CallControls";
import CallStatsAndConfig from "./CallStatsAndConfig";
import { useChannel } from "./Context";
import { useRouter } from "next/navigation";

type VideoPlayerProps = {
    channelName: string | undefined;
    appID: string | undefined;
    token: string | undefined;
    client: IAgoraRTCClient;
};

function VideoPlayer({ channelName, appID, token, client }: VideoPlayerProps) {
    const { setChannelLeft } = useChannel();

    const router = useRouter();

    const callStats = client.getRTCStats();

    const Duration = callStats.Duration;

    const [callDuration, setCallDuration] = useState(Duration);

    const { isLoading: isLoadingMic, localMicrophoneTrack } =
        useLocalMicrophoneTrack();

    const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
    const remoteUsers = useRemoteUsers();
    const remoteUser = remoteUsers[0];
    const { audioTracks } = useRemoteAudioTracks(remoteUsers);

    usePublish([localMicrophoneTrack, localCameraTrack]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCallDuration((prevDuration) => prevDuration + 1);
        }, 1000);
        audioTracks.map((track) => track.play());
        client.on("user-joined", () => {
            console.log("User Joined");
        });
        return () => {
            clearInterval(timer);
            client.on("user-left", () => {
                console.log("User left the call");
            });
        };
    }, []);

    useJoin({
        appid: appID || "",
        channel: channelName || "",
        token: token || null,
    });

    const deviceLoading = isLoadingMic || isLoadingCam;

    const leaveChannel = () => {
        localCameraTrack?.stop();
        localMicrophoneTrack?.stop();
        client.leave();

        setChannelLeft(true);

        router.push("/");
    };

    const numUsers = remoteUsers.length + 1;

    if (deviceLoading || client.connectionState !== "CONNECTED")
        return (
            <div className="text-center text-lg italic font-bold">
                Connecting...
            </div>
        );
    return (
        <div className="h-screen w-full">
            <div className="max-w-4xl my-10 !mb-10 mx-auto max-h-[800px] bg-blue relative rounded border-2 border-red-200">
                {/* End call button  */}
                <div className="absolute z-10 bottom-0 left-0 right-0 flex justify-center pb-4">
                    <div
                        className="px-5 py-3 text-base font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 w-40 cursor-pointer"
                        onClick={() => leaveChannel()}
                    >
                        End Call
                    </div>
                </div>
                <CallControls />
                <CallStatsAndConfig callDuration={callDuration} />
                <LocalVideoTrack
                    track={localCameraTrack}
                    play={true}
                    style={{
                        position: "absolute",
                        top: "0.5rem",
                        right: "0.5rem",
                        width: "200px",
                        height: "200px",
                        // borderRadius: "5rem",
                        border: "4px solid blue",
                        zIndex: "100",
                    }}
                />

                {remoteUsers.length === 0 ? (
                    <div className="h-[800px] w-full text-lg flex items-center justify-center font-bold">
                        Waiting...
                    </div>
                ) : (
                    <RemoteVideoTrack
                        key={remoteUser.uid}
                        track={remoteUser.videoTrack}
                        play={true}
                        style={{
                            // position: "static",
                            width: "100%",
                            height: "800px",
                        }}
                    />
                )}
                {remoteUsers.map((user) => (
                    <RemoteUser key={user.uid} user={user} />
                ))}
            </div>
        </div>
    );
}

export default VideoPlayer;
