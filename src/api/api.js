import axios from "axios";
import App from '../App'

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */



class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;
  

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${data.token}`};
    const params = (method === "get")
        ? data
        : {};

    console.log(url)
    console.log(data)
    // if(token !== undefined) console.log(token)
    console.log(params)
    console.log(headers)
    console.log(headers.Authorization)
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get companies list. */

  static async getItems(item, input, token) {
    if (item === 'companies') {
      const name = input;
      console.log(name)
      const res = await this.request(`${item}`, {name});
      console.log(res)
      return res.companies;
    } else if (item === 'jobs') {
      const title = input;
      const res = await this.request(`${item}`, {title});
      return res.jobs
    } else if (item === 'users') {
      console.log('herere')
      console.log(input)
      const user = input.JSONCurrUser.username
      const token = input.token
      const res = await this.request(`${item}/${user}`, {token});
      console.log(res.user)
      return res.user
    }
  }

  /** Get details on a company by handle. */

  static async getCompany(handle, to) {
    let res = await this.request(`companies/${handle}`);
    console.log(res);
    return res.company;
  }

  /** Register user */

  static async registerUser(user) {
    let res = await this.request(`auth/register`, user, 'post');
    console.log(res)
    return res;
  }

  /** Update user */

  static async updateUser(user, token) {
    const updateData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }
    let res = await this.request(`users/${user.username}`, {updateData, token}, 'patch');
    console.log(res)
    return res.user;
  }

  /** Apply job */

  static async applyJob(user, job, token) {
    // const updateData = {
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //     email: user.email
    // }
    console.log(user)
    console.log(job)
    console.log(token)
    let res = await this.request(`users/${user}/jobs/${job}`, {token}, 'post');
    console.log(res)
    return res;
  }

  /** Login user */

  static async loginUser(user) {
    console.log('loginUser')
    let res = await this.request(`auth/token`, user, 'post');
    console.log(res)
    return res;
  }

  /** Get user */
  static async getCurrUser(user, token){
    console.log('getCurrUser')
    console.log(user)
    console.log(token)
    let res = await this.request(`users/${user}`, token);
    console.log(res)
    return res.user;
  }
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


export default JoblyApi