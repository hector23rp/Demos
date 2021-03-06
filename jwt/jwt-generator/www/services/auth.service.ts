import axios from "axios";
import qs from "qs";

type authBody = {
  username: string;
  password: string;
};
export class AuthService {
  private path: string;
  private body: authBody;

  constructor(path, body?) {
    this.path = path;
    this.body = body;
  }

  setBody(body) {
    this.body = body
  }

  authService() {
    return axios.post(this.path, qs.stringify(this.body), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }
}
