#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {EfcMatchReportsStack} from '../lib/efc-match-reports-stack';

const app = new cdk.App();
new EfcMatchReportsStack(app, 'EfcMatchReportsStack', {
    env: {account: '123456789012', region: 'us-east-1'},
});