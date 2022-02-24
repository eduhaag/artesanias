import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/IDateProveider';
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';

container.registerSingleton<IDateProvider>('DateProvider', DayjsDateProvider);
