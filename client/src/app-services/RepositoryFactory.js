import AllergyDetailsRepository from './repository/AllergyDetailsRepository';
import LoginDetailsRepository from './repository/LoginDetailsRepository';

const repositories = {
  'allergyDetails': AllergyDetailsRepository,
  'loginDetails': LoginDetailsRepository
}
export default {
    get: (repositoryName) =>
    {
      return  repositories[repositoryName]
    }
}