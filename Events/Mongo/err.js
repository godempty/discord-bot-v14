const chalk = require("chalk");

module.exports = {
    name: "err",

    execute(err) {
        console.log(chalk.red(`在連接資料庫時發生錯誤 : \n${err}`));
    },
};
