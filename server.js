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
const helloworldPackage = grpcObject.helloworldPackage;

function main() {
  const server = new grpc.Server();
  server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());

  server.addService(helloworldPackage.Greeter.service, {
    sayHello: sayHello,
  });
  server.start();
  console.log("Server started at port number 50051");
}

main();
function sayHello(call, callback) {
  callback(null, { message: "Hello " + call.request.name });
}
