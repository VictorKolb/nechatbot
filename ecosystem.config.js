module.exports = {
  apps: [
    {
      name: "nechatbot",
      script: "app.js",
    },
  ],

  deploy: {
    production: {
      user: "root",
      host: "95.213.204.224",
      ref: "origin/master",
      repo: "git@github.com:VictorKolb/nechatbot.git",
      path: "/root/nechatbot/",
      "post-deploy": "yarn && yarn prod && pm2 restart nechatbot",
    },
  },
};
