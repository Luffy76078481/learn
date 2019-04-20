/**
 * Created by xm on 2017/8/9.
 */
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export const MuiTheme = getMuiTheme({
    palette: {
        textColor: '#373737',
        primary1Color: '#AC8A4C',
        primary2Color: '#da6440',
        primary3Color: '#da6440',
        alternateTextColor: '#FFFFFF',
        canvasColor: '#dfdfdf',
        borderColor: 'Transparent',
        disabledColor: '#000',
        pickerHeaderColor: '#ff0',
        fontSize: '14px'
    },
    DatePic: {
        fontSize: '14px'
    },
    containerClassName: "date"
});

export const PreferencesIcon = {
    block: {
        maxWidth: 250,

    },
    toggle: {
        marginBottom: 16,
    },
    thumbOff: {
        backgroundColor: '#666',
    },
    trackOff: {
        backgroundColor: '#999',
    },
    thumbSwitched: {
        backgroundColor: '#da6440',
    },
    trackSwitched: {
        backgroundColor: '#999',
    },
    labelStyle: {
        color: '#fff',
        fontFamily:'微軟正黑體'
    },
};


