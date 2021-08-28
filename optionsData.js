export const decipherOptionsData = [
    {
        title: "Alphanumeric",
        example: "ZH43Ay92BSJ86AJSG",
        route: "",
        options: {
            separators: false,
            special: false,
            capital: true,
            lowercase: true,
            numeric: true,
        },
    },

    {
        title: "Numeric",
        example: "9783161484100",
        route: "numeric",
        options: {
            separators: false,
            special: false,
            capital: false,
            lowercase: false,
            numeric: true,
        },
    },
    {
        title: "Apple serial number",
        example: "ZH43Ay92BSJ86AJSG",
        route: "apple",
        options: {
            separators: false,
            special: false,
            capital: true,
            lowercase: false,
            numeric: true,
        },
    },
    {
        title: "ISBN (Int. Standard Book Number)",
        example: "978-3-16-148410-0",
        route: "isbn",
        options: {
            separators: true,
            special: false,
            capital: false,
            lowercase: false,
            numeric: true,
        },
    },
    {
        title: "Universal Product Code",
        example: "0-12345-67890-5",
        route: "upc",
        options: {
            separators: true,
            special: false,
            capital: false,
            lowercase: false,
            numeric: true,
        },
    },
    {
        title: "Adobe Redemption Code",
        example: "3D8A-9C3R-3B7S-9E2J-Q721-B9NX",
        route: "adobe",
        options: {
            separators: true,
            special: false,
            capital: true,
            lowercase: false,
            numeric: true,
        },
    },
];
