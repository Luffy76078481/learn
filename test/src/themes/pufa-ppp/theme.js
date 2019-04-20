/**
 * Created by xm on 2017/8/9.
 */
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export const MuiTheme = getMuiTheme({
    palette: {
        textColor:'#fff',
        primary1Color: '#e3c652',
        primary2Color: '#463625',
        primary3Color: '#463625',
        alternateTextColor: '#FFFFFF',
        canvasColor: '#252525',
        borderColor: 'Transparent',
        disabledColor: '#fff',
        pickerHeaderColor: '#635846',
        fontSize:'14px'
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
        backgroundColor: '#e3c652',
    },
    trackSwitched: {
        backgroundColor: '#999',
    },
    labelStyle: {
        color: '#fff',
        fontFamily:'微軟正黑體'
    },
};


