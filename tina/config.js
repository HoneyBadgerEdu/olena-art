import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const forBlogAndAbout = [
  {
    type: "string",
    name: "title",
    label: "Title",
    isTitle: true,
    required: true,
    description: "Name a blog article",
  },
  {
    type: "string",
    name: "date",
    label: "Date",
    required: true,
    description: "ONLY POSSIBLE DATE FORMAT: 21 Dec 2024",
  },
  {
    type: "image",
    name: "image",
    label: "Picture",
    description: "Download the image",
  },
  {
    type: "string",
    name: "type",
    label: "do not change",
    ui: {
      component: "hidden",
    },
  },
  {
    type: "string",
    name: "layout",
    label: "do not change",
    ui: {
      component: "hidden",
    },
  },
  {
    type: "rich-text",
    name: "body",
    label: "Body",
    isBody: true,
    description: "What this picture is about?",
  },
];

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "img",
      publicFolder: "static",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "arts",
        label: "arts",
        path: "content",
        match: { exclude: "{blog/**,about}" },
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
            description: "Name the picture",
          },
          {
            type: "image",
            name: "image",
            label: "Picture",
            required: true,
            description: "Download the image",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            description: "What this picture is about?",
          },
        ],
      },
      {
        name: "blog",
        label: "blog",
        path: "content/blog",
        match: { exclude: "_index" },
        format: "md",
        defaultItem: () => {
          return {
            type: "blog",
            layout: "about@blog",
          };
        },
        fields: forBlogAndAbout,
      },
      {
        name: "about",
        label: "about me",
        path: "content",
        match: { include: "about" },
        format: "md",
        defaultItem: () => {
          return {
            layout: "about@blog",
          };
        },
        fields: forBlogAndAbout,
      },
    ],
  },
});
