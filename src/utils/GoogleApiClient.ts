type GoogleUser = gapi.auth2.GoogleUser;
export class GoogleApiClient {
  private user: GoogleUser | null;

  get isSignedIn(): boolean {
    return this.user != null;
  }

  /**
   *
   * @param googleApi - assumes it has been initialized
   */
  constructor(private googleApi: typeof gapi) {
    this.user = null;
  }

  public async execute(action: (api: typeof gapi) => void) {
    if (!this.isSignedIn && !(await this.signIn())) {
      throw new Error("Failed to sign in");
    }
    action(this.googleApi);
  }

  public async signIn(): Promise<GoogleUser> {
    this.user = await this.googleApi.auth2.getAuthInstance().signIn();
    return this.user;
  }
}
