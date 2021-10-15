import moment from 'moment';

export function getLocation(cb) {
    navigator.geolocation.getCurrentPosition(position => {
        cb(null, position);
    }, error => {
        console.log("err: " + error.message);
        cb(error.message, null);
    });
}

export const formatDate = (date) => (new Date(date)).toLocaleDateString('fr');

export const getTime = (date) => {
    const time = moment(date, moment.HTML5_FMT.TIME);
    return time.format('LT').split(' ')[0];
};
