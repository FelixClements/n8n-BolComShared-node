import { INodeProperties } from 'n8n-workflow';

// Defining operations for the Process Status resource
export const bolcomResourceOperations: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['processStatus'],
      },
    },
    options: [
      {
        name: 'Get Status by Entity',
        value: 'getStatusByEntity',
        description: 'Get the status of an asynchronous process by entity ID and event type',
        routing: {
          request: {
            method: 'GET',
            url: '/process-status',
						headers: {
							'Authorization': '=Bearer {{$credentials.bolComOAuth2Api.accessToken}}'
						},
            qs: {
              entityId: '={{ $parameter["entityId"] }}',
              eventType: '={{ $parameter["eventType"] }}',
            },
          },
        },
        action: 'Get status of a process by entity ID and event type',
      },
      {
        name: 'Get Status by Process ID',
        value: 'getStatusById',
        description: 'Get the status of an asynchronous process using process status ID',
        routing: {
          request: {
            method: 'GET',
						url: '=/process-status/{{$parameter["processStatusId"]}}',
						headers: {
							'Authorization': '=Bearer {{$credentials.bolComOAuth2Api.accessToken}}'
						},
					},
        },
        action: 'Get status of a process by process status ID',
      },
      {
        name: 'Bulk Get Status',
        value: 'bulkGetStatus',
        description: 'Get the status of multiple asynchronous processes',
        routing: {
          request: {
            method: 'POST',
            url: '/process-status',
						headers: {
							'Authorization': '=Bearer {{$credentials.bolComOAuth2Api.accessToken}}'
						},
            body: {
              processStatusQueries: '={{ $parameter["processStatusQueries"] }}',
            },
          },
        },
        action: 'Get status of multiple process statuses',
      },
    ],
    default: 'getStatusById',
  },
];

// Defining fields for each operation
export const bolcomResourceFields: INodeProperties[] = [
  /* -------------------------------------------------------------------------- */
  /*                                getStatusByEntity                           */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Entity ID',
    name: 'entityId',
    type: 'string',
    default: '',
    description: 'The entity ID to query the process status by entity. For example, an orderItemId or returnId.',
    required: true,
    displayOptions: {
      show: {
        resource: ['processStatus'],
        operation: ['getStatusByEntity'],
      },
    },
  },
  {
    displayName: 'Event Type',
    name: 'eventType',
    type: 'options',
    default: 'CONFIRM_SHIPMENT',
    options: [
			{ name: 'CANCEL_ORDER', value: 'CANCEL_ORDER' },
      { name: 'CONFIRM_SHIPMENT', value: 'CONFIRM_SHIPMENT' },
			{ name: 'CREATE_CAMPAIGN', value: 'CREATE_CAMPAIGN' },
      { name: 'CREATE_SHIPMENT', value: 'CREATE_SHIPMENT' },
			{ name: 'CREATE_SUBSCRIPTION', value: 'CREATE_SUBSCRIPTION' },
      { name: 'UPDATE_OFFER_PRICE', value: 'UPDATE_OFFER_PRICE' },
      { name: 'UPLOAD_INVOICE', value: 'UPLOAD_INVOICE' },
      // Add other event types as available in the API
    ],
    description: 'The event type for the process status. Event type should match with the provided entityId.',
    required: true,
    displayOptions: {
      show: {
        resource: ['processStatus'],
        operation: ['getStatusByEntity'],
      },
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                               getStatusById                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Process Status ID',
    name: 'processStatusId',
    type: 'string',
    default: '',
    description: 'The process status ID that is used to query the status of a single process',
    required: true,
    displayOptions: {
      show: {
        resource: ['processStatus'],
        operation: ['getStatusById'],
      },
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                               bulkGetStatus                                */
  /* -------------------------------------------------------------------------- */
  {
    displayName: 'Process Status Queries',
    name: 'processStatusQueries',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    description: 'An array of Process Status IDs to query for bulk status retrieval. Limit of 1000 IDs.',
    options: [
      {
        name: 'queries',
        displayName: 'Process Status IDs',
        values: [
          {
            displayName: 'Process Status ID',
            name: 'processStatusId',
            type: 'string',
            default: '',
            description: 'A single process status ID to include in the bulk request',
          },
        ],
      },
    ],
    required: true,
    displayOptions: {
      show: {
        resource: ['processStatus'],
        operation: ['bulkGetStatus'],
      },
    },
  },
];
