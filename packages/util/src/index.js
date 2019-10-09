import device from './device';
import promise from './promise';
import * as url from './url';
import * as time from './time';

export default {
    ...device,
    ...promise,
    ...url,
    ...time,
};