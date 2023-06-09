import * as rawMatchData from './testMatchData.json';
import {buildMatchOverviewStats, PlayerOverview, TeamMatchOverviewStats} from "../../src/stats/matchOverview";
import {MatchOverviewCreationError} from "../../src/stats/matchOverviewError";

const forwardPlayers = [
    {
        assists: 1,
        goals: 0,
        name: "Calvert-Lewin",
        number: 9,
        position: "ST",
        rating: 8.2,
        redCards: 0,
        subInTime: undefined,
        subOutTime: 87,
        yellowCards: 1,
        captain: false
    }
] as PlayerOverview[];
const attackingMidPlayers = [
    {
        assists: 1,
        goals: 2,
        name: "McNeil",
        number: 7,
        position: "LW",
        rating: 9.4,
        redCards: 0,
        subInTime: undefined,
        subOutTime: 87,
        yellowCards: 0,
        captain: false
    },
    {
        assists: 0,
        goals: 2,
        name: "Doucouré",
        number: 16,
        position: "AM",
        rating: 9.0,
        redCards: 0,
        subInTime: undefined,
        subOutTime: undefined,
        yellowCards: 1,
        captain: false
    },
    {
        assists: 1,
        goals: 0,
        name: "Iwobi",
        number: 17,
        position: "RW",
        rating: 8.3,
        redCards: 0,
        subInTime: undefined,
        subOutTime: undefined,
        yellowCards: 0,
        captain: false
    }
] as PlayerOverview[];
const defensiveMidPlayers = [
    {
        assists: 0,
        goals: 0,
        name: "Gueye",
        number: 27,
        position: "DM",
        rating: 7.2,
        redCards: 0,
        subInTime: undefined,
        subOutTime: 87,
        yellowCards: 1,
        captain: false
    },
    {
        assists: 0,
        goals: 0,
        name: "Garner",
        number: 37,
        position: "DM",
        rating: 7.2,
        redCards: 0,
        subInTime: undefined,
        subOutTime: undefined,
        yellowCards: 0,
        captain: false
    }
] as PlayerOverview[];
const defensivePlayers = [
    {
        assists: 0,
        goals: 0,
        name: "Mykolenko",
        number: 19,
        position: "LB",
        rating: 7.7,
        redCards: 0,
        subInTime: undefined,
        subOutTime: undefined,
        yellowCards: 0,
        captain: false
    },
    {
        assists: 0,
        goals: 0,
        name: "Tarkowski",
        number: 2,
        position: "CB",
        rating: 7.6,
        redCards: 0,
        subInTime: undefined,
        subOutTime: undefined,
        yellowCards: 0,
        captain: false
    },
    {
        assists: 0,
        goals: 0,
        name: "Mina",
        number: 13,
        position: "CB",
        rating: 7.4,
        redCards: 0,
        subInTime: undefined,
        subOutTime: undefined,
        yellowCards: 1,
        captain: false
    },
    {
        assists: 0,
        goals: 0,
        name: "Patterson",
        number: 3,
        position: "RB",
        rating: 7.1,
        redCards: 0,
        subInTime: undefined,
        subOutTime: undefined,
        yellowCards: 0,
        captain: false
    },
] as PlayerOverview[];
const goalkeeper = [
    {
        assists: 0,
        goals: 0,
        name: "Pickford",
        number: 1,
        position: "GK",
        rating: 8.2,
        redCards: 0,
        subInTime: undefined,
        subOutTime: undefined,
        yellowCards: 0,
        captain: true
    }
] as PlayerOverview[];

describe('Match Overview', () => {
    it('Should create match overview stats from raw match data', () => {
        const matchData = rawMatchData;
        const expectedMatchOverview: TeamMatchOverviewStats = {
            matchTime: 'Mon, May 8, 2023, 16:30 UTC',
            teamScore: 5,
            oppositionScore: 1,
            referee: 'Simon Hooper',
            teamCoach: 'Sean Dyche',
            oppositionCoach: 'Roberto De Zerbi',
            teamForm: 'L-L-D-L-D',
            oppositionTeamForm: 'W-L-L-W-W',
            formation: '4-2-3-1',
            players: [
                forwardPlayers,
                attackingMidPlayers,
                defensiveMidPlayers,
                defensivePlayers,
                goalkeeper
            ],
            stadium: {
                name: 'The American Express Community Stadium',
                city: 'Falmer, East Sussex',
                country: 'England',
                attendance: 31567
            }
        };

        const actualOverview = buildMatchOverviewStats(matchData as any, 8668);

        expect(actualOverview).toEqual(expectedMatchOverview);
    });

    it('Should throw a MatchOverviewCreationError if required match data is malformed/missing', () => {
        expect(() => buildMatchOverviewStats({
            content: {} as any,
            header: {} as any,
            general: {} as any
        }, 8668)).toThrow(new MatchOverviewCreationError('Cannot generate Match Overview'));
    });
});