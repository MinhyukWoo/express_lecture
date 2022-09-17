const relationship = {
    name: "zero",
    friends: ["nero", "hero", "xero"],
    logFriends: function () {
        const that = this;
        this.friends.forEach(function (friend) {
            console.log(that.name, friend);
        })
    }
}
relationship.logFriends()