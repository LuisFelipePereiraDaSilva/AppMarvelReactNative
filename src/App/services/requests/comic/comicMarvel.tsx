import {apiMarvel} from '../../ApiMarvel';
import {Character} from '../../../types/character';
import {Comic} from '../../../types/comic';
import {Serie} from '../../../types/serie';
import {Storie} from '../../../types/Storie';
import {Event} from '../../../types/event';
import {Creator} from '../../../types/creator';

export const getListComics = async () => {
  return await getComics()
    .then((list) => {
      return list;
    })
    .catch((error) => {
      throw error.toString();
    });
};

export const getComic = async (idUrl: string) => {
  return await getComics(idUrl)
    .then((list) => {
      return list && list.length > 0 ? list[0] : null;
    })
    .catch((error) => {
      throw error.toString();
    });
};

const getComics = async (idUrl?: string) => {
  const comics: Comic[] = [];
  await apiMarvel
    .get(idUrl ? idUrl : 'https://gateway.marvel.com/v1/public/comics')
    .then((result: any) => {
      if (result) {
        result = result.data.data.results;
        result.map((comic: any) => {
          const series: Serie[] = [];
          series.push({
            name: comic.series.name,
            resourceURI: comic.series.resourceURI,
          });

          const creatorsAux = comic.creators.items;
          const creators: Creator[] = [];
          creatorsAux.map((creator: any) => {
            creators.push({
              name: creator.name,
              resourceURI: creator.resourceURI,
            });
          });

          const charactersAux = comic.characters.items;
          const characters: Character[] = [];
          charactersAux.map((character: any) => {
            characters.push({
              name: character.name,
              resourceURI: character.resourceURI,
            });
          });

          const storiesAux = comic.stories.items;
          const stories: Storie[] = [];
          storiesAux.map((storie: any) => {
            stories.push({name: storie.name, resourceURI: storie.resourceURI});
          });

          const eventsAux = comic.events.items;
          const events: Event[] = [];
          eventsAux.map((event: any) => {
            events.push({name: event.name, resourceURI: event.resourceURI});
          });

          const image =
            comic.thumbnail.path +
            '/portrait_incredible.' +
            comic.thumbnail.extension;

          comics.push({
            id: comic.id,
            name: comic.title,
            description: comic.description,
            image: image,
            series: series,
            creators: creators,
            characters: characters,
            stories: stories,
            events: events,
            resourceURI: comic.resourceURI,
          });
        });
      }
    })
    .catch((error) => {
      throw error.toString();
    });

  return comics;
};
