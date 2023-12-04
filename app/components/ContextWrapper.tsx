import React from "react";
import { ChannelProvider } from "./Context";

function ContextWrapper({ children }: { children: React.ReactNode }) {
    return <ChannelProvider>{children}</ChannelProvider>;
}

export default ContextWrapper;
