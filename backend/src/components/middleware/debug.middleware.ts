import { Logger } from '@nestjs/common';

export function debugRequest(req, res, next) {
    Logger.debug(` ${req.headers['user-agent'].split(') ')[0]}`, 'Request initated', false);
    next();
}
