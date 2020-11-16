import {apiMarvel} from '../../ApiMarvel';
import {Character} from '../../../types/character';
import {Comic} from '../../../types/comic';
import {Serie} from '../../../types/serie';
import {Storie} from '../../../types/Storie';
import {Event} from '../../../types/event';
import {Creator} from '../../../types/creator';

export const getListStories = async () => {
  return await getStories()
    .then((list) => {
      return list;
    })
    .catch((error) => {
      throw error.toString();
    });
};

export const getStorie = async (idUrl: string) => {
  return await getStories(idUrl)
    .then((list) => {
      return list && list.length > 0 ? list[0] : null;
    })
    .catch((error) => {
      throw error.toString();
    });
};

const getStories = async (idUrl?: string) => {
  const stories: Storie[] = [];
  await apiMarvel
    .get(idUrl ? idUrl : 'https://gateway.marvel.com/v1/public/stories')
    .then((result: any) => {
      if (result) {
        result = result.data.data.results;
        result.map((storie: any) => {
          const creatorsAux = storie.creators.items;
          const creators: Creator[] = [];
          creatorsAux.map((creator: any) => {
            creators.push({
              name: creator.name,
              resourceURI: creator.resourceURI,
            });
          });

          const charactersAux = storie.characters.items;
          const characters: Character[] = [];
          charactersAux.map((character: any) => {
            characters.push({
              name: character.name,
              resourceURI: character.resourceURI,
            });
          });

          const seriesAux = storie.series.items;
          const series: Serie[] = [];
          seriesAux.map((serie: any) => {
            series.push({name: serie.name, resourceURI: serie.resourceURI});
          });

          const comicsAux = storie.comics.items;
          const comics: Comic[] = [];
          comicsAux.map((comic: any) => {
            comics.push({name: comic.name, resourceURI: comic.resourceURI});
          });

          const eventsAux = storie.events.items;
          const events: Event[] = [];
          eventsAux.map((event: any) => {
            events.push({name: event.name, resourceURI: event.resourceURI});
          });

          stories.push({
            id: storie.id,
            name: storie.title,
            description: storie.description,
            creators: creators,
            characters: characters,
            comics: comics,
            events: events,
            series: series,
            resourceURI: storie.resourceURI,
          });
        });
      }
    })
    .catch((error) => {
      throw error.toString();
    });

  return stories;
};
