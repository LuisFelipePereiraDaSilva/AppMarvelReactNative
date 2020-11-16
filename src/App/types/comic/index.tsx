import {Serie} from '../serie';
import {Creator} from '../creator';
import {Character} from '../character';
import {Storie} from '../storie';
import {Event} from '../event';

export interface Comic {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  series?: Serie[];
  creators?: Creator[];
  characters?: Character[];
  stories?: Storie[];
  events?: Event[];
  resourceURI: string;
}
