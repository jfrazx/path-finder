export interface EndpointIdentity {
  identify(): EndpointIdentified;
}

export interface EndpointIdentified {
  shouldContinue: boolean;
  pathComplete: boolean;
  isEndpoint: boolean;
}
