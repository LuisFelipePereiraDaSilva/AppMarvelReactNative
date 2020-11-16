import {apiMarvel} from '../../ApiMarvel';
import {Comic} from '../../../types/comic';
import {Serie} from '../../../types/serie';
import {Storie} from '../../../types/Storie';
import {Event} from '../../../types/event';
import {Creator} from '../../../types/creator';

export const getListCreators = async () => {
  return await getCreators()
    .then((list) => {
      return list;
    })
    .catch((error) => {
      throw error.toString();
    });
};

export const getCreator = async (idUrl: string) => {
  return await getCreators(idUrl)
    .then((list) => {
      return list && list.length > 0 ? list[0] : null;
    })
    .catch((error) => {
      throw error.toString();
    });
};

const getCreators = async (idUrl?: string) => {
  const creators: Creator[] = [];
  await apiMarvel
    .get(idUrl ? idUrl : 'https://gateway.marvel.com/v1/public/creators')
    .then((result: any) => {
      if (result) {
        result = result.data.data.results;
        result.map((creator: any) => {
          const comicsAux = creator.comics.items;
          const comics: Comic[] = [];
          comicsAux.map((comic: any) => {
            comics.push({name: comic.name, resourceURI: comic.resourceURI});
          });

          const seriesAux = creator.series.items;
          const series: Serie[] = [];
          seriesAux.map((serie: any) => {
            series.push({name: serie.name, resourceURI: serie.resourceURI});
          });

          const storiesAux = creator.stories.items;
          const stories: Storie[] = [];
          storiesAux.map((storie: any) => {
            stories.push({name: storie.name, resourceURI: storie.resourceURI});
          });

          const eventsAux = creator.events.items;
          const events: Event[] = [];
          eventsAux.map((event: any) => {
            events.push({name: event.name, resourceURI: event.resourceURI});
          });

          const image =
            creator.thumbnail.path +
            '/portrait_incredible.' +
            creator.thumbnail.extension;

          creators.push({
            id: creator.id,
            name: creator.fullName,
            image: image,
            comics: comics,
            series: series,
            stories: stories,
            events: events,
            resourceURI: creator.resourceURI,
          });
        });
      }
    })
    .catch((error) => {
      throw error.toString();
    });

  return creators;
};
