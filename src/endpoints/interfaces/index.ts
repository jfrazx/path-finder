export interface EndpointIdentity {
  identify(): EndpointIdentified;
}

export interface EndpointIdentified {
  readonly shouldContinue: boolean;
  readonly pathComplete: boolean;
  readonly isEndpoint: boolean;
}
