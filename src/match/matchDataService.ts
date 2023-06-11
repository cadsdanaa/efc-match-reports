import {Axios} from "axios";
import {MatchData} from "./matchData";
import {MatchDataRetrievalError} from "./matchDataErrors";

export class MatchDataService {

    private matchDetailsUrl = "https://www.fotmob.com/api/matchDetails";
    private matchIdParam = "matchId";
    private axios: Axios;

    constructor(axios: Axios) {
        this.axios = axios;
    }

    async retrieveMatchData(matchId: string): Promise<MatchData> {
        const matchDataUrl = new URL(this.matchDetailsUrl);
        matchDataUrl.searchParams.append(this.matchIdParam, matchId);
        try {
            const resp = await this.axios.get(matchDataUrl.href);
            return resp.data;
        } catch (error: any) {
            throw new MatchDataRetrievalError(error.message);
        }
    }

}