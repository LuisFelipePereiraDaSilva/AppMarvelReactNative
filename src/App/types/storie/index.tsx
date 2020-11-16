import {Comic} from '../comic';
import {Serie} from '../serie';
import {Creator} from '../creator';
import {Character} from '../character';
import {Event} from '../event';

export interface Storie {
  id?: string;
  name: string;
  description?: string;
  creators?: Creator[];
  characters?: Character[];
  series?: Serie[];
  comics?: Comic[];
  events?: Event[];
  resourceURI: string;
}
