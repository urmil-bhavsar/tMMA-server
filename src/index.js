const app = require("./app");
const { dbConnect } = require("./db");

dbConnect()
    .then(() => {
        app
            .listen(process.env.PORT, () => {
                console.log(`\nServer started on port ${process.env.PORT}`);
            })
            .on("error", (error) =>
                console.log("Error connecting to the server ", error)
            );
    })
    .catch((error) => {
        console.log("Error in connecting to the database ", error);
    });

// Optional: Graceful shutdown handling
process.on("SIGTERM", () => {
    console.log("SIGTERM signal received: closing server...");
    server.close(() => {
        console.log("Server closed.");
        process.exit(0);
    });
});

process.on("SIGINT", () => {
    console.log("SIGINT signal received: shutting down.");
    process.exit(0);
});