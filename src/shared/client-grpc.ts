import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { join } from 'path';

const PROTO_PATH = join(__dirname, 'proto/discount.proto');

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const DiscountService: any =
  grpc.loadPackageDefinition(packageDefinition).discount;

const client = new DiscountService.Discount(
  `localhost:50051`,
  grpc.credentials.createInsecure(),
);

export default client;
