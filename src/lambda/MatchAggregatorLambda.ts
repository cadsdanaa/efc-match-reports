import { Handler } from 'aws-lambda';
import {MatchDataService} from "../match/matchDataService";
import axios from "axios";
import {buildMatchOverviewStats} from "../stats/matchOverview";

export const handler: Handler = async (event) => {
    const matchDataService = new MatchDataService(axios);
    const matchData = await matchDataService.retrieveMatchData('3901273');
    const matchOverview = buildMatchOverviewStats(matchData, 8668);
    console.log(JSON.stringify(matchOverview));
};