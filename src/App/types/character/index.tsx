import {Comic} from '../comic';
import {Serie} from '../serie';
import {Storie} from '../storie';
import {Event} from '../event';

export interface Character {
  id?: string;
  name: string;
  description?: string;
  image?: String;
  comics?: Comic[];
  series?: Serie[];
  storie?: Storie[];
  events?: Event[];
  resourceURI: string;
}
