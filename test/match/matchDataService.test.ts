import {Axios, AxiosError} from "axios";
import {Content, General, Header, MatchData} from "../../src/match/matchData";
import {MatchDataService} from "../../src/match/matchDataService";
import {MatchDataRetrievalError} from "../../src/match/matchDataErrors";

describe('Match Data Service', () => {
   it('Should retrieve match data', async () => {
      const matchData: MatchData = {
         content: {} as Content,
         header: {
            status: {
               scoreStr: "2 - 0"
            }
         } as Header,
         general: {} as General
      };
      const axios = new Axios({});
      axios.get = jest.fn().mockResolvedValue({data: matchData});
      const matchDataService = new MatchDataService(axios);

      const actualMatchData = await matchDataService.retrieveMatchData('someMatchId');

      expect(actualMatchData).toEqual(matchData);
   });

   it('Should throw a MatchDataUnavailableError given issue retrieving match data', async () => {
      const axios = new Axios({});
      axios.get = jest.fn().mockRejectedValue(new AxiosError('someIssue'));
      const matchDataService = new MatchDataService(axios);

      const actualError = await matchDataService.retrieveMatchData('someMatchId').catch(err => err);

      expect(actualError).toEqual(new MatchDataRetrievalError('someIssue'));
   });
});