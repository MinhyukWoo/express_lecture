const relationship = {
  name: "zero",
  friends: ["nero", "hero", "xero"],
  logFriends() {
    const that = this;
    this.friends.forEach((friend) => {
      console.log(that.name, friend);
    });
  },
};
relationship.logFriends();
