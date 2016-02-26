module.exports = {
    "env": {
        "es6": true,
        "node": true,
    },
    //"extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true,
        },
        "sourceType": "module",
    },
    "plugins": [
        "react",
    ],
    "extends": "plugin:react/recommended",
    "globals": {
      "fetch": true,
    },
    "rules": {
        "indent": [
            2,
            2,
        ],
        "linebreak-style": [
            2,
            "unix",
        ],
        "quotes": [
            2,
            "single",
            "avoid-escape",
        ],
        "semi": [
            2,
            "never",
        ],
        "comma-dangle": [
          2,
          "always-multiline",
        ],
        "react/prop-types": [
          0, // Show as warning for now
        ]
    },
};
