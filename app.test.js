import app from './app';
import request from 'supertest';
import { get } from 'axios';

jest.mock('axios');
const error = jest.spyOn(console, "error");

describe('getActivity', () => {
    it('maps the accessibility and prices', async () => {
        get.mockResolvedValue({
          data: {
              "activity": "Start a band",
              "type": "music",
              "participants": 4,
              "price": 0.6,
              "link": "",
              "key": "5675880",
              "accessibility": 0.8
          }
        });
      
        const response = await request(app).get('/activity');
        const expectedData = {
          "activity": "Start a band",
          "type": "music",
          "participants": 4,
          "price": "High",
          "link": "",
          "key": "5675880",
          "accessibility": "Low"
        }
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(expectedData);
    });

    it('throws error', async () => {
        get.mockImplementation(() => {
            throw new Error("oh no");
          });
      
      
        const response = await request(app).get('/activity');

        expect(get).toHaveBeenCalled();
        expect(response.status).toEqual(500);
        expect(error).toHaveBeenCalledWith("Error fetching activity");
      });
});
