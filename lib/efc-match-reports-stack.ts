import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import {Runtime} from "aws-cdk-lib/aws-lambda";
import {Duration} from "aws-cdk-lib";

export class EfcMatchReportsStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        new NodejsFunction(this, "aggregatorLambda", {
            runtime: Runtime.NODEJS_18_X,
            memorySize: 128,
            timeout: Duration.minutes(1),
            entry: "./src/lambda/MatchAggregatorLambda.ts",
            handler: "handler",
            environment: {},
        });

    }
}
