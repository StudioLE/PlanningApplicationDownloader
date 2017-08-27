# Planning Application Downloader

A Google Chrome extension providing an easy method to download all assets from a planning application.

Download it from the [Chrome Web Store](https://chrome.google.com/webstore/detail/cinlipnkidejahanokkmacfedcnkklga)

## Adding Planning Portal Domains

At present only the following planning portals have been added to the extension.

- [Bracknell Forest Council](https://planapp.bracknell-forest.gov.uk/online-applications/)
- [City of Westminster](http://idoxpa.westminster.gov.uk/online-applications/)
- [Newcastle City Council](https://publicaccessapplications.newcastle.gov.uk/online-applications/)
- [Tower Hamlets](https://development.towerhamlets.gov.uk/online-applications/)

If you would like another planning portal domain to be added please [create an issue on GitHub](https://github.com/StudioLE/PlanningApplicationDownloader/issues/new). Or if you have a little coding experience you can create a pull request after forking the repository and adding the details of the portal to the following files:

```
README.md
src/manifest.json
src/js/background.js
```

## Releases

All tagged releases are available at [/releases](https://github.com/StudioLE/PlanningApplicationDownloader/releases).

## Contributing

I'm always on the look out for collaborators so feel free to suggest new features, get in touch or just fork at will.

## Developer Install

Clone the repository

```
git clone https://github.com/StudioLE/PlanningApplicationDownloader.git PlanningApplicationDownloader
```

Enter the directory and install the dependencies. For this step you'll need to have [Node.js](https://nodejs.org/) and [bower](http://bower.io/) installed.

```
cd PlanningApplicationDownloader
npm install
```

Behind the scenes this will also call `bower install`.

Now run the default gulp task to produce an up to date build

```
gulp build
```

## Developer usage

A number of development tasks can be performed via gulp.

Produce a build from the app source
```
gulp build
```
Clean the `build` directory 
```
gulp clean
```
Bump the package version numbers
```
gulp bump
```

## Thanks

[Roof Icon](https://thenounproject.com/term/roof/369098)  by Juan Pablo Bravo from the Noun Project. Available under a [Creative Commons license](https://creativecommons.org/licenses/by/3.0/us/).