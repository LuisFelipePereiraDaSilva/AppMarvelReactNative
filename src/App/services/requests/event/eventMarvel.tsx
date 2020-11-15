import {apiMarvel} from '../../ApiMarvel';
import {Character} from '../../../types/character';
import {Comic} from '../../../types/comic';
import {Serie} from '../../../types/serie';
import {Storie} from '../../../types/Storie';
import {Event} from '../../../types/event';
import {Creator} from '../../../types/creator';

export const getListEvents = async () => {
  return await getEvents()
    .then((list) => {
      return list;
    })
    .catch((error) => {
      throw error.toString();
    });
};

export const getEvent = async (idUrl: string) => {
  return await getEvents(idUrl)
    .then((list) => {
      return list && list.length > 0 ? list[0] : null;
    })
    .catch((error) => {
      throw error.toString();
    });
};

const getEvents = async (idUrl?: string) => {
  const events: Event[] = [];
  await apiMarvel
    .get(idUrl ? idUrl : 'https://gateway.marvel.com/v1/public/events')
    .then((result: any) => {
      if (result) {
        result = result.data.data.results;
        result.map((event: any) => {
          const creatorsAux = event.creators.items;
          const creators: Creator[] = [];
          creatorsAux.map((creator: any) => {
            creators.push({
              name: creator.name,
              resourceURI: creator.resourceURI,
            });
          });

          const charactersAux = event.characters.items;
          const characters: Character[] = [];
          charactersAux.map((character: any) => {
            characters.push({
              name: character.name,
              resourceURI: character.resourceURI,
            });
          });

          const storiesAux = event.stories.items;
          const stories: Storie[] = [];
          storiesAux.map((storie: any) => {
            stories.push({name: storie.name, resourceURI: storie.resourceURI});
          });

          const comicsAux = event.comics.items;
          const comics: Comic[] = [];
          comicsAux.map((comic: any) => {
            comics.push({name: comic.name, resourceURI: comic.resourceURI});
          });

          const seriesAux = event.series.items;
          const series: Serie[] = [];
          seriesAux.map((serie: any) => {
            series.push({name: serie.name, resourceURI: serie.resourceURI});
          });

          const image =
            event.thumbnail.path +
            '/portrait_incredible.' +
            event.thumbnail.extension;

          events.push({
            id: event.id,
            name: event.name,
            description: event.description,
            startDate: event.start,
            endDate: event.end,
            image: image,
            creators: creators,
            characters: characters,
            comics: comics,
            series: series,
            stories: stories,
            resourceURI: event.resourceURI,
          });
        });
      }
    })
    .catch((error) => {
      throw error.toString();
    });

  return events;
};
