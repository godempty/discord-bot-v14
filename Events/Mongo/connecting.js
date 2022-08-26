const chalk = require("chalk");

module.exports = {
    name: "connecting",

    execute() {
        console.log(chalk.cyan("[資料庫狀態] : 連接中..."));
    },
};
