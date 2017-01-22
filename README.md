# Planning Application Downloader

A Google Chrome extension providing an easy method to download all assets from a planning application.

At present the application is only configured for the [Westminster Planning Portal](http://idoxpa.westminster.gov.uk/online-applications/). If you would like another planning portal domain to be added please [create an issue on GitHub](https://github.com/StudioLE/PlanningApplicationDownloader/issues/new).

## Releases

All releases are available in the [/releases](https://github.com/StudioLE/ajbl/tree/master/releases) directory.

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
Create a `.crx` release
```
gulp release
```
