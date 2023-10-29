import { formatDistanceToNow } from 'date-fns';
import {es } from 'date-fns/locale';
export {formatDistanceToNow} from 'date-fns';

export const formatDistance = (date: number) => {
    const fromNow =  formatDistanceToNow(new Date(date) , {locale: es});

    return `Hace ${fromNow}`
}