import { Injectable } from '@nestjs/common';

import { refer_docs, IHttpMessage } from 'src/shared/response/http-message';

@Injectable()
export class AppService {
  root(): IHttpMessage {
    return refer_docs('https://github.com/azizzaeny/study-group/');
  }
}
