const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("helloworld.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const grpcObject = grpc.loadPackageDefinition(packageDef);
function main() {
  const helloworldPackage = grpcObject.helloworldPackage;

  const client = new helloworldPackage.Greeter(
    "localhost:50051",
    grpc.credentials.createInsecure()
  );

  client.sayHello({ name: "John" }, function (err, response) {
    console.log("Greeting:", response.message);
  });
}
main();
