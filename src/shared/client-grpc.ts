import { Injectable } from '@nestjs/common';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

import { join } from 'path';
@Injectable()
export class ClientGRPC {
  private PROTO_PATH = join(__dirname, 'proto/discount.proto');
  private options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  };
  private packageDefinition = protoLoader.loadSync(
    this.PROTO_PATH,
    this.options,
  );
  private discountService;

  constructor() {
    this.discountService = grpc.loadPackageDefinition(
      this.packageDefinition,
    ).discount;
  }

  init() {
    return new this.discountService.Discount(
      `${process.env.DISCOUNT_SERVICE_HOST}`,
      grpc.credentials.createInsecure(),
    );
  }
}
