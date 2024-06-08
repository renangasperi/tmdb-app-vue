export interface CastMember {
  cast_id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface CreditsResponse {
  id: number;
  cast: CastMember[];
}
