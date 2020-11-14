import {Comic} from '../comic';
import {Serie} from '../serie';
import {Storie} from '../Storie';
import {Creator} from '../creator';
import {Character} from '../character';

export interface Event {
  id?: string;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  image?: string;
  creators?: Creator[];
  characters?: Character[];
  stories?: Storie[];
  comics?: Comic[];
  series?: Serie[];
  resourceURI: string;
}
