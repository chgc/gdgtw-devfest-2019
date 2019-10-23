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
  id: number;
  name: string;
  country: string;
  compoany: string;
  avatar: string;
  description: string;
  sessions: number[];
  social: Social[];
}

export interface Session {
  id: number;
  title: string;
  description: string;
  tags: string[];
  difficulty: string;
  language: string;
  speakers: number[];
  trackId: number;
  startTime: string;
  endTime: string;
}

export interface Track {
  id: number;
  location: string;
}

export interface Sponsor {
  name: string;
  logo: string;
  level: string;
  description: string;
}

export interface Team {
  id: number;
  name: string;
  title: string;
  avatar: string;
  team: string;
  social: Social[];
}
