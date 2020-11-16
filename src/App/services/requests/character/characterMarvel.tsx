import {apiMarvel} from '../../ApiMarvel';
import {Character} from '../../../types/character';
import {Comic} from '../../../types/comic';
import {Serie} from '../../../types/serie';
import {Storie} from '../../../types/Storie';
import {Event} from '../../../types/event';

export const getListCharacters = async () => {
  return await getCharacters()
    .then((list) => {
      return list;
    })
    .catch((error) => {
      throw error.toString();
    });
};

export const getCharacter = async (idUrl: string) => {
  return await getCharacters(idUrl)
    .then((list) => {
      return list && list.length > 0 ? list[0] : null;
    })
    .catch((error) => {
      throw error.toString();
    });
};

const getCharacters = async (idUrl?: string) => {
  const characters: Character[] = [];
  await apiMarvel
    .get(idUrl ? idUrl : 'https://gateway.marvel.com/v1/public/characters')
    .then((result: any) => {
      if (result) {
        result = result.data.data.results;
        result.map((character: any) => {
          const comicsAux = character.comics.items;
          const comics: Comic[] = [];
          comicsAux.map((comic: any) => {
            comics.push({name: comic.name, resourceURI: comic.resourceURI});
          });

          const seriesAux = character.series.items;
          const series: Serie[] = [];
          seriesAux.map((serie: any) => {
            series.push({name: serie.name, resourceURI: serie.resourceURI});
          });

          const storiesAux = character.stories.items;
          const stories: Storie[] = [];
          storiesAux.map((storie: any) => {
            stories.push({name: storie.name, resourceURI: storie.resourceURI});
          });

          const eventsAux = character.events.items;
          const events: Event[] = [];
          eventsAux.map((event: any) => {
            events.push({name: event.name, resourceURI: event.resourceURI});
          });

          const image =
            character.thumbnail.path +
            '/portrait_incredible.' +
            character.thumbnail.extension;

          characters.push({
            id: character.id,
            name: character.name,
            description: character.description,
            image: image,
            comics: comics,
            series: series,
            stories: stories,
            events: events,
            resourceURI: character.resourceURI,
          });
        });
      }
    })
    .catch((error) => {
      throw error.toString();
    });

  return characters;
};
