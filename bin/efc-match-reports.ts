#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {EfcMatchReportsStack} from '../lib/efc-match-reports-stack';

const app = new cdk.App();
new EfcMatchReportsStack(app, 'EfcMatchReportsStack', {
    env: {account: '571324972013', region: 'us-east-1'},
});