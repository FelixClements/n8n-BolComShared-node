import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { bolcomResourceOperations, bolcomResourceFields } from './BolComSharedResourceDescription';

export class BolComShared implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Bol.com Shared API',
    name: 'bolComShared',
    icon: 'file:bolcom.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with bol.com Shared API for asynchronous process statuses',
    defaults: {
      name: 'Bol.com Shared',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'bolComOAuth2Api',
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: 'https://api.bol.com/shared',
      headers: {
        'Accept': 'application/vnd.retailer.v10+json',
        'Content-Type': 'application/json',
      },
    },
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Process Status',
            value: 'processStatus',
          },
        ],
        default: 'processStatus',
      },
      ...bolcomResourceOperations,
      ...bolcomResourceFields,
    ],
  };
}
