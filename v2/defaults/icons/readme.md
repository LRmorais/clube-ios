## As of Dec 11, 2019:

### Managing icons

Every icon in this folder will become an character at the generated font, acessible in it by its file name.
So, `close.svg` will be acessible through `close` in the `Icon` component.

### Generating the font

Run at the root of the project:

```
npm run icon-font
```

It will:
1. Generate the font file, json map file and preview at `/out` folder;
2. Copy the font file to assets folder;
3. Link the font to the project.

### Using the font

After generating the font (it will be already linked), it is necessary to rebuild the application.
So run:

```
npm run [android|ios]
```

The `Icon` component will automatically use the json map file to map the `id` props to the corresponding character.
