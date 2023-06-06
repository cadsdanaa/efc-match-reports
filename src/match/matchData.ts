export interface MatchData {
    general:       General;
    header:        Header;
    content:       Content;
}

export interface Content {
    matchFacts: MatchFacts;
    lineup:     Lineup;
}

export interface Status {
    utcTime:              Date;
    finished:             boolean;
    started:              boolean;
    cancelled:            boolean;
    scoreStr:             string;
}

export interface MatchDate {
    utcTime: Date;
}

export interface Lineup {
    lineup:               LineupElement[];
    bench:                Bench;
    coaches:              Coaches;
}

export interface Bench {
    sides:    Side[];
    benchArr: Array<BenchArrElement[]>;
}

export interface BenchArrElement {
    id:                string;
    positionId:        number;
    name:              Name;
    shirt:             number;
    usualPosition:     number;
    usingOptaId:       boolean;
    teamId:            string;
    imageUrl:          string;
    pageUrl:           string;
    isHomeTeam:        boolean;
    timeSubbedOn:      number | null;
    timeSubbedOff:     null;
    positionRow:       number;
    isCaptain:         boolean;
    events:            BenchArrEvents;
    rating:            Rating;
    minutesPlayed:     number;
    stats:             BenchArrStat[];
}

export interface BenchArrEvents {
    sub?: PurpleSub;
}

export interface PurpleSub {
    subbedIn: number;
}

export interface Name {
    firstName: string;
    lastName:  string;
    fullName:  string;
}

export interface Rating {
    num:     null | string;
}

export interface BenchArrStat {
    stats: PurpleStats;
}

export interface PurpleStats {
    Goals?:                             Stat;
    Assists?:                           Stat;
}

export interface AccurateCrosses {
    key:   AccurateCrossesKey;
    value: string;
}

export enum AccurateCrossesKey {
    AccurateCrosses = "accurate_crosses",
    AccuratePasses = "accurate_passes",
    AerialsWon = "aerials_won",
    DribblesSucceeded = "dribbles_succeeded",
    ExpectedAssists = "expected_assists",
    ExpectedGoals = "expected_goals",
    ExpectedGoalsOnTargetFaced = "expected_goals_on_target_faced",
    ExpectedGoalsOnTargetVariant = "expected_goals_on_target_variant",
    FantasyPoints = "fantasy_points",
    GroundDuelsWon = "ground_duels_won",
    LongBallsAccurate = "long_balls_accurate",
    ShotAccuracy = "shot_accuracy",
    TacklesSucceeded = "tackles_succeeded",
}

export interface AccurateLongBalls {
    key:   AccurateCrossesKey;
    value: number | string;
}

export interface Stat {
    value: number;
}

export enum Side {
    Away = "away",
    Home = "home",
}

export interface Coaches {
    sides:      Side[];
    coachesArr: Array<Coach[]>;
}

export interface Coach {
    id:            string;
    name:          Name;
    imageUrl:      string;
}

export interface LineupElement {
    teamId:              number;
    teamName:            string;
    bench:               BenchArrElement[];
    coach:               Coach[];
    players:             Array<PlayerElement[]>;
    lineup:              string;
}

export interface PlayerElement {
    id:                  string;
    positionId:          number;
    positionStringShort: string;
    localizedPosition:   PositionLabel;
    name:                Name;
    shirt:               number;
    usualPosition:       number;
    imageUrl:            string;
    timeSubbedOn:        number | null;
    timeSubbedOff:       number | null;
    positionRow:         number;
    isCaptain:           boolean;
    events:              PlayerEvents;
    rating:              Rating;
    minutesPlayed:       number;
    stats:               PlayerStat[];
}

export interface PlayerEvents {
    yc?:  number;
    g?:   number;
    sub?: FluffySub;
}

export interface FluffySub {
    subbedOut: number;
}

export interface PositionLabel {
    label: string;
    key:   string;
}

export interface PlayerStat {
    stats: FluffyStats;
}

export interface FluffyStats {
    Goals?:                             Stat;
    Assists?:                           Stat;
}

export interface MatchFacts {
    matchId:          number;
    playerOfTheMatch: PlayerOfTheMatch;
    infoBox:          InfoBox;
    teamForm:         Array<TeamForm[]>;
}

export interface InfoBox {
    "Match Date": MatchDate;
    Tournament:   Tournament;
    Stadium:      Stadium;
    Referee:      Referee;
}

export interface Referee {
    text:    string;
}

export interface Stadium {
    name:    string;
    city:    string;
    country: string;
}

export interface Tournament {
    id:              number;
    leagueName:      string;
    round:           string;
}

export interface PlayerOfTheMatch {
    id:            number;
    name:          Name;
    teamId:        number;
    rating:        PlayerOfTheMatchRating;
    minutesPlayed: number;
}

export interface PlayerOfTheMatchRating {
    num:   string;
}

export interface TeamForm {
    result:       number;
    resultString: string;
}

export interface General {
    matchId:            string;
    matchName:          string;
    matchRound:         string;
    leagueId:           number;
    leagueName:         string;
    leagueRoundName:    string;
    parentLeagueId:     number;
    parentLeagueName:   string;
    parentLeagueSeason: string;
    homeTeam:           GeneralTeam;
    awayTeam:           GeneralTeam;
    matchTimeUTC:       string;
    matchTimeUTCDate:   Date;
    started:            boolean;
    finished:           boolean;
}

export interface GeneralTeam {
    name: string;
    id:   number;
}

export interface Header {
    teams:  Team[];
    status: Status;
}

export interface Team {
    name:     string;
    id:       number;
    score:    number;
    imageUrl: string;
}