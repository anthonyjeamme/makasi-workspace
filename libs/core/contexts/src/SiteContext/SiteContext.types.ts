import { TConnector } from '@workspace/core/entities';

export type TSiteContext = {
  connector: TConnector;
  sections: TSectionDefinition[];
};

export type TSectionDefinition = {
  type: string;
  Component: React.ComponentType<unknown>;
};
