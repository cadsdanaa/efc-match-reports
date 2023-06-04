import { Handler } from 'aws-lambda';

export const handler: Handler = async (event) => {
    console.log('EVENT: ' + JSON.stringify(event));
};