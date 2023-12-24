import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import io from "socket.io-client";
import Graph from "./graph";
import ModalDialog from "./dialog";

const socket = io("http://localhost:3001");

function App() {
    // const [graphData, setGraphData] = useState<number[]>([0]);
    const graphData = useRef<number[]>([]);
    const [isDialogOpen, setIsDialogopen] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0)

    const [numberState, updateState] = React.useState<number>(0);
    const forceUpdate = React.useCallback(() => {
      return updateState(numberState + 1);
    }, []);

    const addNumberAndUpdateGraph = (number: number) => {
        const newGraphData = [...graphData.current, number];
        // newGraphData.push(number);
        graphData.current.push(number);
        graphData.current = graphData.current.slice(-30);
        console.log("newGraphData ", graphData.current);
    };

    const refreshPage = () => {
        setCount(count + 1)
    };

    useEffect(() => {
        console.log("connecting to server");
        socket.on("connect", () => {
            console.log("Connected to server socket");
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from server socket");
        });

        socket.on("serverMessage", (msg) => {
            console.log("msg", msg);
            const number = Number(msg);

            if (number % 10 == 0) {
                setIsDialogopen(true);
            } else {
                addNumberAndUpdateGraph(number);
            }

            refreshPage();
        });

        return () => {
            // Clean up the socket connection when the component unmounts
            console.log("disconnecting from server");
            // socket.disconnect();
        };
    }, []);

    return (
        <div>
            <h1>Your Graph</h1>
            <Graph numbers={graphData.current} />
            <ModalDialog
                open={isDialogOpen}
                onClose={function (): void {
                    console.log("closed dialog");
                    setIsDialogopen(false);
                }}
            />
        </div>
    );
}

export default App;
