import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as EfcMatchReports from '../lib/efc-match-reports-stack';

test('Stack Created', () => {
  const app = new cdk.App();
    // WHEN
  const stack = new EfcMatchReports.EfcMatchReportsStack(app, 'MyTestStack');
    // THEN
  const template = Template.fromStack(stack);

  template.hasResource('AWS::Lambda::Function', {});
});
