import {MatchData} from "../match/matchData";
import {MatchOverviewCreationError} from "./matchOverviewError";

export function buildMatchOverviewStats(matchData: MatchData, teamId: number): TeamMatchOverviewStats {
    try {
        const {teamIndex, oppositionIndex} = matchData.header.teams[0].id === teamId
            ? {teamIndex: 0, oppositionIndex: 1} : {teamIndex: 1, oppositionIndex: 0};
        const overview = {} as TeamMatchOverviewStats;
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
        overview.formation = matchData.content.lineup.lineup[teamIndex].lineup.replace(/ /g, "");
        overview.teamForm = matchData.content.matchFacts.teamForm[teamIndex].map(form => {
            return form.resultString;
        }).join("-");
        overview.oppositionTeamForm = matchData.content.matchFacts.teamForm[oppositionIndex].map(form => {
            return form.resultString;
        }).join("-");
        overview.players = matchData.content.lineup.lineup[teamIndex].players.map(players => {
            return players.map(player => {
                return {
                    captain: player.isCaptain,
                    assists: player.events.as || 0,
                    goals: player.events.g || 0,
                    name: player.name.lastName,
                    number: player.shirt,
                    position: player.positionStringShort,
                    rating: player.rating.num,
                    redCards: player.events.rc || 0,
                    subInTime: player.timeSubbedOn,
                    subOutTime: player.timeSubbedOff,
                    yellowCards: player.events.yc || 0
                } as PlayerOverview;
            });
        });
        overview.subs = matchData.content.lineup.lineup[teamIndex].bench.filter(benchPlayer => {
            return benchPlayer.timeSubbedOn !== null;
        }).map(subbedPlayers => {
            return {
                captain: subbedPlayers.isCaptain,
                assists: subbedPlayers.events.as || 0,
                goals: subbedPlayers.events.g || 0,
                name: subbedPlayers.name.lastName,
                number: subbedPlayers.shirt,
                position: "Sub",
                rating: subbedPlayers.rating.num,
                redCards: subbedPlayers.events.rc || 0,
                subInTime: subbedPlayers.timeSubbedOn,
                subOutTime: subbedPlayers.timeSubbedOff,
                yellowCards: subbedPlayers.events.yc || 0
            } as PlayerOverview;
        });
        return overview;
    } catch(e) {
        console.error(e);
        throw new MatchOverviewCreationError("Cannot generate Match Overview");
    }
}

export interface TeamMatchOverviewStats {
    teamScore: number;
    oppositionScore: number;
    stadium: Stadium;
    matchTime: string;
    players: Array<PlayerOverview[]>;
    subs: PlayerOverview[];
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
    rating: string | null;
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
    subInTime: number | null;
    subOutTime: number | null;
    captain: boolean;
}

export interface Stadium {
    name: string;
    city: string;
    country: string;
    attendance: number | undefined;
}