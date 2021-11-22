export type ProfileConfig = {
  api_key: string;
  org_id: string;
};

export type ParsedPipedreamConfig = {
  api_key: string;
  profiles: Record<string, ProfileConfig>;
};
