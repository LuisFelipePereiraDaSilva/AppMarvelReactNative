import {apiMarvel} from '../../ApiMarvel';
import {Character} from '../../../types/character';
import {Comic} from '../../../types/comic';
import {Serie} from '../../../types/serie';
import {Storie} from '../../../types/Storie';
import {Event} from '../../../types/event';
import {Creator} from '../../../types/creator';

export const getListSeries = async () => {
  return await getSeries()
    .then((list) => {
      return list;
    })
    .catch((error) => {
      throw error.toString();
    });
};

export const getSerie = async (idUrl: string) => {
  return await getSeries(idUrl)
    .then((list) => {
      return list && list.length > 0 ? list[0] : null;
    })
    .catch((error) => {
      throw error.toString();
    });
};

const getSeries = async (idUrl?: string) => {
  const series: Serie[] = [];
  await apiMarvel
    .get(idUrl ? idUrl : 'https://gateway.marvel.com/v1/public/series')
    .then((result: any) => {
      if (result) {
        result = result.data.data.results;
        result.map((serie: any) => {
          const creatorsAux = serie.creators.items;
          const creators: Creator[] = [];
          creatorsAux.map((creator: any) => {
            creators.push({
              name: creator.name,
              resourceURI: creator.resourceURI,
            });
          });

          const charactersAux = serie.characters.items;
          const characters: Character[] = [];
          charactersAux.map((character: any) => {
            characters.push({
              name: character.name,
              resourceURI: character.resourceURI,
            });
          });

          const storiesAux = serie.stories.items;
          const stories: Storie[] = [];
          storiesAux.map((storie: any) => {
            stories.push({name: storie.name, resourceURI: storie.resourceURI});
          });

          const comicsAux = serie.comics.items;
          const comics: Comic[] = [];
          comicsAux.map((comic: any) => {
            comics.push({name: comic.name, resourceURI: comic.resourceURI});
          });

          const eventsAux = serie.events.items;
          const events: Event[] = [];
          eventsAux.map((event: any) => {
            events.push({name: event.name, resourceURI: event.resourceURI});
          });

          const image =
            serie.thumbnail.path +
            '/portrait_incredible.' +
            serie.thumbnail.extension;

          series.push({
            id: serie.id,
            name: serie.title,
            description: serie.description,
            startYear: serie.startYear,
            endYear: serie.endYear,
            image: image,
            creators: creators,
            characters: characters,
            comics: comics,
            events: events,
            stories: stories,
            resourceURI: serie.resourceURI,
          });
        });
      }
    })
    .catch((error) => {
      throw error.toString();
    });

  return series;
};
