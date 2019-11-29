export interface EventInfo {
  event: BasicInfo;
  speakers: Speaker[];
  sessions: Session[];
  tracks: Track[];
  sponsors: Sponsor[];
  teams: Team[];
}

export interface Location {
  name: string;
  address: string;
  googlemap: string;
}

export interface Stat {
  attendence: number;
  days: number;
  senssions: number;
  tracks: number;
}

export interface Social {
  type: string;
  url: string;
}

export interface BasicInfo {
  title: string;
  bannerImage: string;
  date: string;
  location: Location;
  introduction: string;
  stats: Stat;
  featureSpeakers: number[];
  social: Social[];
}

export interface Speaker {
  speaker_id: string;
  speaker_image: string;
  speaker_name: string;
  speaker_desc: string;
  speaker_session: string;
  fb_url?: any;
  github_url?: any;
  linkedin_url?: any;
  twitter_url?: any;
}

export interface Link {
  presentation: string;
  video: string;
  hackmd: string;
}

export interface Session {
  session_id: string;
  session_start_time: string;
  session_total_time: string;
  session_title: string;
  session_desc: string;
  speaker_id: string;
  track_id: string;
  track_name?: string;
  isHidden?: boolean;
  isOnly?: boolean;
  tags: any[];
  links: Link;
}

export interface Track {
  id: string;
  title: string;
}

export interface Sponsor {
  name: string;
  image: string;
  desc: string;
  url: string;
  logo: string;
  level?: string;
}

export interface Team {
  name: string;
  desc: string;
  contribution: string;
  image: string;
  job: string;
  speciality: string;
  fb_url: string;
  twitter_url: string;
  linkedin_url: string;
  github_url: string;
}
