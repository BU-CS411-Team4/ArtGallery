export class User {
  constructor(
    id: any,
    googleId: any,
    displayName: any
  ) {}
}

export class NullUser extends User {
  constructor() {
    super(null, null, null);
  }
}
