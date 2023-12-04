"use client";
import React, { useEffect, useState } from "react";
import CallRoom from "../components/CallRoom";

function page() {
    const [render, setRender] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setRender(true);
        }
    }, []);

    if (!render) return null;
    return <CallRoom />;
    // return <div>Hello</div>;
}

export default page;
