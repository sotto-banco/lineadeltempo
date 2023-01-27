import Store, { Schema } from 'electron-store';
import fs from 'fs';

export interface MediaObject {
  url: string;
  alt: string;
}

export interface TextObject {
  headline: string;
  text: string;
}

interface DateObject {
  year: number;
  month?: number;
  day?: number;
}

export interface TitleObject {
  text: TextObject;
  media: MediaObject;
}

interface EventMediaObject extends MediaObject {
  thumbnail: string;
}

interface CoordsObject {
  lat: number;
  lon: number;
  title: string;
}

export interface EventObject {
  start_date: DateObject;
  end_date?: DateObject;
  display_date: string;
  autolink: true;
  group?: string;
  text: TextObject;
  media?: EventMediaObject;
  coords?: CoordsObject;
}

export interface EraObject {
  start_date: DateObject;
  end_date: DateObject;
  text: TextObject;
}

///

interface Data {
  title: TitleObject;
  events: EventObject[];
  eras: EraObject[];
  dataJsonPath: string;
  projectPath: string;
  mediaPath: string;
}

// dataSchema
const dataSchema: Schema<Data> = {
  title: {
    type: 'object',
    properties: {
      text: {
        type: 'object',
        properties: {
          headline: {
            type: 'string',
            default: '',
          },
          text: {
            type: 'string',
            default: '',
          },
        },
        default: {},
        required: ['headline', 'text'],
      },
      media: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            default: '',
          },
          alt: {
            type: 'string',
            default: '',
          },
        },
        default: {},
        required: ['url', 'alt'],
      },
    },
    default: {},
    required: ['text'],
  },
  events: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        start_date: {
          type: 'object',
          properties: {
            year: {
              type: 'number',
              minimum: -9999,
              maximum: 9999,
            },
            month: {
              type: 'number',
              minimum: 1,
              maximum: 12,
            },
            day: {
              type: 'number',
              minimum: 1,
              maximum: 31,
            },
          },
          default: {},
          required: ['year'],
        },
        end_date: {
          type: 'object',
          properties: {
            year: {
              type: 'number',
              minimum: -9999,
              maximum: 9999,
            },
            month: {
              type: 'number',
              minimum: 1,
              maximum: 12,
            },
            day: {
              type: 'number',
              minimum: 1,
              maximum: 31,
            },
          },
          default: {},
          required: [],
        },
        display_date: {
          type: 'string',
          default: 'Display Date',
        },
        autolink: {
          type: 'boolean',
          default: true,
        },
        group: {
          type: 'string',
          default: 'Group',
        },
        text: {
          type: 'object',
          properties: {
            headline: {
              type: 'string',
              default: '',
            },
            text: {
              type: 'string',
              default: '',
            },
          },
          default: {},
          required: ['headline', 'text'],
        },
        media: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              default: '',
            },
            alt: {
              type: 'string',
              default: '',
            },
            thumbnail: {
              type: 'string',
              default: '',
            },
          },
          default: {},
          required: ['url', 'alt', 'thumbnail'],
        },
        coords: {
          type: 'object',
          properties: {
            lat: {
              type: 'number',
              default: 0,
            },
            lon: {
              type: 'number',
              default: 0,
            },
            title: {
              type: 'string',
              default: '',
            },
          },
          default: {},
          required: ['lat', 'lon', 'title'],
        },
      },
      default: {},
      required: ['start_date', 'display_date', 'autolink', 'text'],
    },
    default: [],
  },
  eras: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        start_date: {
          type: 'object',
          properties: {
            year: {
              type: 'number',
              minimum: -9999,
              maximum: 9999,
            },
            month: {
              type: 'number',
              minimum: 1,
              maximum: 12,
            },
            day: {
              type: 'number',
              minimum: 1,
              maximum: 31,
            },
          },
          default: {},
          required: ['year'],
        },
        end_date: {
          type: 'object',
          properties: {
            year: {
              type: 'number',
              minimum: -9999,
              maximum: 9999,
            },
            month: {
              type: 'number',
              minimum: 1,
              maximum: 12,
            },
            day: {
              type: 'number',
              minimum: 1,
              maximum: 31,
            },
          },
          default: {},
          required: ['year'],
        },
        text: {
          type: 'object',
          properties: {
            headline: {
              type: 'string',
              default: '',
            },
            text: {
              type: 'string',
              default: '',
            },
          },
          default: {},
          required: ['headline', 'text'],
        },
      },
      default: {},
      required: ['start_date', 'end_date', 'text'],
    },
    default: [],
  },
  dataJsonPath: {
    type: 'string',
    default: '',
  },
  projectPath: {
    type: 'string',
    default: '',
  },
  mediaPath: {
    type: 'string',
    default: '',
  },
};

const store = new Store<Data>({ schema: dataSchema });

export const getTitle = () => {
  if (store.get('dataJsonPath') !== '') {
    try {
      const dataJson = JSON.parse(
        fs.readFileSync(store.get('dataJsonPath'), 'utf8')
      );
      store.set('title', dataJson.title);
      store.set('events', dataJson.events);
      store.set('eras', dataJson.eras);
      return store.get('title');
    } catch (error) {
      console.log(error);
      return null;
    }
  }
};
export const getEvents = () => {
  if (store.get('dataJsonPath') !== '') {
    try {
      const dataJson = JSON.parse(
        fs.readFileSync(store.get('dataJsonPath'), 'utf8')
      );
      store.set('title', dataJson.title);
      store.set('events', dataJson.events);
      store.set('eras', dataJson.eras);
      return store.get('events');
    } catch (error) {
      return null;
    }
  }
};
export const getDataJsonPath = () => store.get('dataJsonPath');
export const setDataJsonPath = (path: string) => {
  store.set('dataJsonPath', path);
};
export const getProjectPath = () => store.get('projectPath');
export const setProjectPath = (path: string) => {
  store.set('projectPath', path);
};
export const getMediaPath = () => store.get('mediaPath');
export const setMediaPath = (path: string) => {
  store.set('mediaPath', path);
};

export const getEras = () => store.get('eras');
export const setTitle = (title: TitleObject) => store.set('title', title);
export const setEvents = (events: EventObject[]) => store.set('events', events);
export const setEras = (eras: EraObject[]) => store.set('eras', eras);
