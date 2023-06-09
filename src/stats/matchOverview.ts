import {MatchData} from "../match/matchData";
import {MatchOverviewCreationError} from "./matchOverviewError";

export function buildMatchOverviewStats(matchData: MatchData, teamId: number): TeamMatchOverviewStats {
    try {
        const {teamIndex, oppositionIndex} = matchData.header.teams[0].id === teamId
            ? {teamIndex: 0, oppositionIndex: 1} : {teamIndex: 1, oppositionIndex: 0};
        let overview = {} as TeamMatchOverviewStats;
        overview.stadium = {
            attendance: matchData.content.matchFacts.infoBox.Attendance,
            name: matchData.content.matchFacts.infoBox.Stadium.name,
            country: matchData.content.matchFacts.infoBox.Stadium.country,
            city: matchData.content.matchFacts.infoBox.Stadium.city
        };
        overview.referee = matchData.content.matchFacts.infoBox.Referee.text;
        overview.teamScore = matchData.header.teams[teamIndex].score;
        overview.oppositionScore = matchData.header.teams[oppositionIndex].score;
        overview.matchTime = matchData.general.matchTimeUTC;
        overview.teamCoach = matchData.content.lineup.coaches.coachesArr[teamIndex][0].name.fullName;
        overview.oppositionCoach = matchData.content.lineup.coaches.coachesArr[oppositionIndex][0].name.fullName;
        overview.formation = matchData.content.lineup.lineup[teamIndex].lineup.replace(/ /g, '');
        overview.teamForm = matchData.content.matchFacts.teamForm[teamIndex].map(form => {
            return form.resultString;
        }).join('-');
        overview.oppositionTeamForm = matchData.content.matchFacts.teamForm[oppositionIndex].map(form => {
            return form.resultString;
        }).join('-');
        return overview;
    } catch(e) {
        console.error(e);
        throw new MatchOverviewCreationError('Cannot generate Match Overview');
    }
}

export interface TeamMatchOverviewStats {
    teamScore: number;
    oppositionScore: number;
    stadium: Stadium;
    matchTime: string;
    players: Array<PlayerOverview[]>;
    referee: string;
    teamForm: string;
    oppositionTeamForm: string;
    teamCoach: string;
    oppositionCoach: string;
    formation: string;
}

export interface PlayerOverview {
    name: string;
    number: number;
    position: string;
    rating: number;
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
    subInTime: number | undefined;
    subOutTime: number | undefined;
    captain: boolean;
}

export interface Stadium {
    name: string;
    city: string;
    country: string;
    attendance: number | undefined;
}