const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const printSchemaFromBuild = require("./config/printSchema");
const { setupDB } = require("./config/databaseConnection");
const cors = require("cors");

const app = express();

setupDB((message) => {
  console.log("setupDB callback executed with message:", message);

  if (message === "DB OK") {
    const port = process.env.PORT || 5000;
    app.use(cors());
    app.use("/graphql", graphqlHTTP({ schema, graphiql: true, pretty: true }));

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    printSchemaFromBuild(schema);
    console.log("SERVER OK");
  } else {
    console.error("Failed to connect to the database:", message);
  }
});

const port = process.env.PORT || 4000;

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    pretty: true,
  })
);

app.listen(port);
printSchemaFromBuild(schema);
console.log("SERVER OK");
