"use client";
import React from "react";
import {
    VideoCameraIcon,
    MicrophoneIcon,
    SpeakerWaveIcon,
    PhoneIcon,
} from "@heroicons/react/20/solid";

function CallControls() {
    return (
        <div className="bg-white rounded-xl flex items-center justify-evenly py-1 absolute w-[85%] max-w-2xl transform -translate-x-1/2 left-1/2 bottom-20 z-10 border border-blue-500">
            <button className="group">
                <VideoCameraIcon className="w-5 h-5 lg:w-8 lg:h-8 text-blue-600 group-hover:scale-110" />
            </button>

            <button className="rounded-full w-6 h-6 lg:w-9 lg:h-9 bg-blue-600 flex items-center justify-center hover:scale-110">
                <MicrophoneIcon className="w-5 h-5 lg:w-8 lg:h-8 text-white" />
            </button>

            <button className="group">
                <SpeakerWaveIcon className="w-5 h-5 lg:w-8 lg:h-8 text-blue-600 group-hover:scale-110" />
            </button>
        </div>
    );
}

export default CallControls;
