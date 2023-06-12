import { Construct } from "constructs";
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import {Runtime} from "aws-cdk-lib/aws-lambda";
import {Duration, StackProps, Stack} from "aws-cdk-lib";
import {BlockPublicAccess, Bucket} from "aws-cdk-lib/aws-s3";
import {BucketDeployment, Source} from "aws-cdk-lib/aws-s3-deployment";

export interface MatchReportsProps extends StackProps {
    assetBucketName: string;
}

export class EfcMatchReportsStack extends Stack {
    constructor(scope: Construct, id: string, props: MatchReportsProps) {
        super(scope, id, props);

        const reportAssetBucket = new Bucket(this, "reportAssetBucket", {
            bucketName: props.assetBucketName,
            blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
            enforceSSL: true,
            versioned: true
        });

        new BucketDeployment(this, "DeployStaticReportingAssets", {
            sources: [Source.asset("./assets")],
            destinationBucket: reportAssetBucket
        });

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
