import Store, { Schema } from 'electron-store';

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

interface Event {
  start_date: DateObject;
  end_date?: DateObject;
  display_date: string;
  autolink: true;
  group?: string;
  text: TextObject;
  media?: EventMediaObject;
  coords?: CoordsObject;
}

interface Era {
  start_date: DateObject;
  end_date: DateObject;
  text: TextObject;
}

///

interface Data {
  title: TitleObject;
  events: Event[];
  eras: Era[];
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
    required: ['text', 'media'],
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
              minimum: 1,
              maximum: 9999,
              default: 2020,
            },
            month: {
              type: 'number',
              minimum: 1,
              maximum: 12,
              default: 1,
            },
            day: {
              type: 'number',
              minimum: 1,
              maximum: 31,
              default: 1,
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
              minimum: 1,
              maximum: 9999,
              default: 2020,
            },
            month: {
              type: 'number',
              minimum: 1,
              maximum: 12,
              default: 1,
            },
            day: {
              type: 'number',
              minimum: 1,
              maximum: 31,
              default: 1,
            },
          },
          default: {},
          required: ['year'],
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
              minimum: 1,
              maximum: 9999,
              default: 2020,
            },
            month: {
              type: 'number',
              minimum: 1,
              maximum: 12,
              default: 1,
            },
            day: {
              type: 'number',
              minimum: 1,
              maximum: 31,
              default: 1,
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
              minimum: 1,
              maximum: 9999,
              default: 2020,
            },
            month: {
              type: 'number',
              minimum: 1,
              maximum: 12,
              default: 1,
            },
            day: {
              type: 'number',
              minimum: 1,
              maximum: 31,
              default: 1,
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
};

const store = new Store<Data>({ schema: dataSchema });

export const getTitle = () => store.get('title');
export const getEvents = () => store.get('events');
export const getEras = () => store.get('eras');

export const setTitle = (title: TitleObject) => store.set('title', title);
export const setEvents = (events: Event[]) => store.set('events', events);
export const setEras = (eras: Era[]) => store.set('eras', eras);
