// webpack.config.js
const path = require('path'); // подключаем path к конфигу вебпак

module.exports = {
    entry: { main: './script/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    }
}

// переписали точку выхода, используя утилиту path