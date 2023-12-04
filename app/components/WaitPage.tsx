"use client";
import React from "react";
import Link from "next/link";
import { useChannel } from "./Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function WaitPage() {
    const { channelLeft } = useChannel();

    const notify = () =>
        toast("Rate your experience with Doctor XYZ!", {
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
        });

    if (channelLeft) {
        notify();
    }

    return (
        <div className="h-screen flex flex-col gap-y-5 items-center justify-center">
            <h1 className="font-bold text-xl">MediCare Virtual Checkup</h1>
            <Link
                className="bg-blue-600 font-bold text-lg rounded-lg py-2 px-3 text-white"
                href={"/callRoom"}
            >
                Join Room
            </Link>
            <ToastContainer />
        </div>
    );
}

export default WaitPage;
