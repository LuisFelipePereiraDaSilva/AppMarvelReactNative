import {Comic} from '../comic';
import {Serie} from '../serie';
import {Storie} from '../storie';
import {Event} from '../event';

export interface Character {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  comics?: Comic[];
  series?: Serie[];
  stories?: Storie[];
  events?: Event[];
  resourceURI: string;
}
