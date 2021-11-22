export type Workflow = {
  id: string;
  indexed_at_ms: number;
  event: {
    raw_event: object;
  };
  metadata: {
    emit_id: string;
    name: string;
    emitter_id: string;
  };
};

type _ConfigurableProp = {
  name: string;
  type: string;
  label: string;
  description: string;
};

export type Component = {
  id: string;
  code: string;
  code_hash: string;
  name: string;
  version: `${number}.${number}.${number}`;
  configurable_props: Array<_ConfigurableProp>;
  created_at: number;
  updated_at: number;
};

export type Subscription = {
  id: string;
  emitter_id: string;
  listener_id: string;
  event_name: string;
};

export type Source = {
  active: boolean;
  component_id: string;
  configured_props: Record<string, unknown>;
  created_at: number;
  id: string;
  name: string;
  name_slug: string;
  updated_at: number;
  user_id?: string | undefined;
};
