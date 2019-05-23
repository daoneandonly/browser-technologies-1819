# Browser Technologies

> Using Progressive Enhancements in my Webapp

I recently made an app, in a very quick timeframe. Now I'm looking at it through lens of accessibility.

## The core functionality

The core functionality of this app is searching in a set (data object) of cards, based on different terms or types. This should work no matter what.

## When is it pleasurable?

The prime pleasurable layer is when the list of data updates on every keystroke. The list instantaneously results of the search.

---

So what happens when problems occur? I've looked at a list potential problems and how these could be fixed.

### No Images

#### Problems

The images don't feature a `alt` tag. The entire app is based on images so they should have some form of `alt` tag description.

#### Fixes

```Javascript
<img class='previewImage' src='${data.imageUrl}' alt="Image of the card ${data.name}"/>
```

### Custom fonts

#### Problems

The app uses the custom font Lato. There is currently no fallback

#### Fixes

Use a sans-serif font as a fallback.

```css
@import url('https://fonts.googleapis.com/css?family=Lato:400,700');
body {
  font-family: Lato, sans-serif;
}
```

### No Color or partially colorblind

#### Problems

The app uses little to no color for the design. The only color comes from the images.

### No mouse/trackpad

#### Problems

While working as intended even with tabbing through the app, there are some weird unintended interactions.

- The search bar executes when you tab through the app.
- You can't reach the radio buttons with tabs.

#### Fixes

- Don't execute the search too soon
- Make the radio selectable

### Low speed internet

#### Problems

The app loads in 183 results at once. The load isn't slow, but it could be quicker especially running on slower internet

#### Fixes

Using some form of lazy loading through the results OR paginate the results over mulitple pages.

### No Javascript

#### Problems

The app gets its data through javascript so it could be hard running the app in any form without javascript. However the loader runs infinitely and doesn't show it's not running.

#### Fixes

Change when loader starts and ends. Give an indication when there is no javascript running and the app won't load.

### No Cookies

#### Problems

The app doesn't uses any form of cookies. So no problems here!

### No LocalStorage

#### Problems

The app uses localStorage but isn't dependent on it. Whenever a page (except the main page) is loaded, the app checks localStorage. If there is any storage saved, it uses it. If not, it creates a new API request.

## Tools

I've used the following tools to test my web app.

- [Colorblindly](https://chrome.google.com/webstore/detail/colorblindly/floniaahmccleoclneebhhmnjgdfijgg)
- [Web Developer](https://chrome.google.com/webstore/detail/web-developer/bfbameneiokkgbdmiekhjnmfkcnldhhm)
- [Chrome Vox](https://chrome.google.com/webstore/detail/chromevox/kgejglhpjiefppelpmljglcjbhoiplfn)

## Screenreader Test

The screenreader (sometimes) mentions the element it is, or it is in. This becomes especially awkward when there are multiple sections nested into eachother. The single page is usable, the page overview could be better. This could be fixed with alt tags.
