import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSocket } from "../context/SocketContext";

const NotificationHandler = () => {
    const { socket } = useSocket();

    useEffect(() => {
        if (!socket) return; // Early return if socket isn't available

        const handleNotification = (message) => {
            toast(message, {
                duration: 4000,
                position: "top-right",

                style: {
                    background: "#333",
                    color: "#fff",
                    borderRadius: "8px",
                    padding: "12px"
                },
            });
        };

        socket.on("productNotification", handleNotification);

        // Additional error handling
        socket.on("connect_error", (error) => {
            console.error("Socket connection error:", error);
        });

        return () => {
            socket.off("productNotification", handleNotification);
            socket.off("connect_error");
        };
    }, [socket]);

    return null;
};

export default NotificationHandler;