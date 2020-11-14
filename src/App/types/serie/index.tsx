import {Comic} from '../comic';
import {Storie} from '../Storie';
import {Creator} from '../creator';
import {Character} from '../character';
import {Event} from '../event';

export interface Serie {
  id?: string;
  name: string;
  description?: string;
  startYear?: string;
  endYear?: string;
  image?: string;
  creators?: Creator[];
  characters?: Character[];
  stories?: Storie[];
  comics?: Comic[];
  events?: Event[];
  resourceURI: string;
}
