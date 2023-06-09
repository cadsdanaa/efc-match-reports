export interface MatchData {
    general: General;
    header: Header;
    content: Content;
}

export interface Content {
    matchFacts: MatchFacts;
    lineup: Lineup;
}

export interface Status {
    scoreStr: string;
}

export interface Lineup {
    lineup: TeamLineup[];
    coaches: Coaches;
}

export interface Name {
    firstName: string;
    lastName: string;
    fullName: string;
}

export interface Rating {
    num: null | string;
}

export interface Stat {
    value: number;
}

export enum Side {
    Away = "away",
    Home = "home",
}

export interface Coaches {
    sides: Side[];
    coachesArr: Array<Coach[]>;
}

export interface Coach {
    id: string;
    name: Name;
    imageUrl: string;
}

export interface TeamLineup {
    teamId: number;
    teamName: string;
    bench: PlayerElement[];
    coach: Coach[];
    players: Array<PlayerElement[]>;
    lineup: string;
}

export interface PlayerElement {
    id: string;
    positionStringShort: string | 'Sub'
    name: Name;
    shirt: number;
    imageUrl: string;
    timeSubbedOn: number | null;
    timeSubbedOff: number | null;
    isCaptain: boolean;
    events: PlayerEvents;
    rating: Rating;
}

export interface PlayerEvents {
    yc?: number;
    rc?: number;
    as?: number;
    g?: number;
}

export interface MatchFacts {
    matchId: number;
    infoBox: InfoBox;
    teamForm: Array<TeamForm[]>;
}

export interface InfoBox {
    Stadium: Stadium;
    Referee: Referee;
    Attendance: number | undefined;
}

export interface Referee {
    text: string;
}

export interface Stadium {
    name: string;
    city: string;
    country: string;
}

export interface TeamForm {
    resultString: string;
}

export interface General {
    matchId: string;
    leagueName: string;
    homeTeam: Team;
    awayTeam: Team;
    matchTimeUTCDate: Date;
    matchTimeUTC: string;
}

export interface Team {
    name: string;
    id: number;
    score: number;
}

export interface Header {
    teams:  Team[];
    status: Status;
}