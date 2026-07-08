import { APIRequestContext } from '@playwright/test';

export interface PolicyPayload {
  customerDetails: {
    name: string;
    email: string;
    phone: string;
  };
  policyType: string;
  coverageAmount: number;
  premium: number;
  effectiveDate: string;
}

export interface PolicyResponse {
  policyNumber: string;
  message: string;
  status: string;
}

export class PolicyAPI {
  readonly request: APIRequestContext;
  readonly baseURL: string;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
  }

  async createPolicy(payload: PolicyPayload) {
    const response = await this.request.post(`${this.baseURL}/api/policies`, {
      data: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  }
}
