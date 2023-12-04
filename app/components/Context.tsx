"use client";
import React, {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from "react";

type ChannelContextType = {
    channelLeft: boolean;
    setChannelLeft: Dispatch<SetStateAction<boolean>>;
};

// Create the context
const ChannelContext = createContext<ChannelContextType | undefined>(undefined);

// Create a context provider component
export const ChannelProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [channelLeft, setChannelLeft] = useState(false);

    // Define the context value
    const contextValue = {
        channelLeft,
        setChannelLeft,
    };

    return (
        <ChannelContext.Provider value={contextValue}>
            {children}
        </ChannelContext.Provider>
    );
};

// Create a custom hook for using the channel context
export const useChannel = () => {
    const context = useContext(ChannelContext);

    if (!context) {
        throw new Error("useChannel must be used within a ChannelProvider");
    }

    return context;
};
