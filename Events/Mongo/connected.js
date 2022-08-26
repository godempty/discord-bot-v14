const chalk = require("chalk");

module.exports = {
    name: "connected",

    execute() {
        console.log(chalk.green("[資料庫狀態] : 已連接"));
    },
};
