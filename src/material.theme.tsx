const CONFIG_THEME = {
    spacing: 10,
    palette: {
        primary: { main: '#50BB98' },
        secondary: { main: '#165C73' },
        accent: { main: '#AAD05E' },

        error: { main: '#A94442' },
        warning: { main: '#FF7043' },
        info: { main: '#165C73' },
        success: { main: '#50BB98' },

        white: { main: '#FFFFFF' },

        backgroundColor: { main: '#F0F0F0' },
        backgroundCard: { main: '#FFFFFF' },
        lineDivider: { main: '#E8E8E8' },

        text: {
            primary: '#666666'
            // secondary: '#CBEBE0',
            // disabled: 'rgba(0,0,0,0.38)'
        },

        progress: { main: '#63D1AD' },
        progressAccent: { main: '#B2FF59' },

        sleepProgress: { main: '#EDE7F6', dark: '#432970' },
        sleepProgressAccent: { main: '#9575CD' },

        stageLight: { main: '#5C6AC0' },
        stageDeep: { main: '#283593' },
        stageRem: { main: '#9EA8DB' },
        stageAwake: { main: '#F9A825' },

        fitbitActive: { main: '#00B0B9' },
        fitbitInactive: { main: '#BDBDBD' },

        activityGroupOne: { main: '#165C73' },
        activityGroupTwo: { main: '#891262' },
        activityGroupThree: { main: '#FF7043' },

        chartLine: { main: '#EAF7F3', dark: '#27966A' },
        chartBar: { main: '#B3E5D6' },
        chartBarSecondary: { main: '#9FBFCB' }
    },
    typography: {
        fontFamily: 'Roboto'
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 560,
            md: 800,
            lg: 1280,
            xl: 1920
        },
    }
}

export default CONFIG_THEME