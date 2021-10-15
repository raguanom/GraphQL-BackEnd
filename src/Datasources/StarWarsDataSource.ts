import { RESTDataSource } from "apollo-datasource-rest";

export class StarWarsDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://swapi.dev";
  }

  async getAllPeople(pageNumber: number) {
    const { results } = await this.get(`/api/people/?page=${pageNumber}`);
    return results;
  }

  async getPersonByName(personName: string){
      const { results } = await this.get(`/api/people/?search=${personName}`);
      return results[0];
  }
}
