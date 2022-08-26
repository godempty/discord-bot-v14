const chalk = require("chalk");

module.exports = {
    name: "disconnected",

    execute() {
        console.log(chalk.red("[資料庫狀態] : 已斷開"));
    },
};
