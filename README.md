# Planning Application Downloader

A Google Chrome extension providing an easy method to download all assets from a planning application.

Download it from the [Chrome Web Store](https://chrome.google.com/webstore/detail/cinlipnkidejahanokkmacfedcnkklga)

## Adding Planning Portal Domains

At present only the following planning portals have been added to the extension:

- [Barking and Dagenham](http://paplan.lbbd.gov.uk/online-applications/)
- [Barnet](https://publicaccess.barnet.gov.uk/online-applications/)
- [Bexley](http://pa.bexley.gov.uk/online-applications/)
- [Bracknell Forest](https://planapp.bracknell-forest.gov.uk/online-applications/)
- [Brent](https://pa.brent.gov.uk/online-applications/)
- [Bromley](https://searchapplications.bromley.gov.uk/online-applications/)
- [Cornwall](http://planning.cornwall.gov.uk/online-applications/)
- [Croydon](https://publicaccess3.croydon.gov.uk/online-applications/)
- [Ealing](https://pam.ealing.gov.uk/online-applications/)
- [Ebbsfleet](http://applications.ebbsfleetdc.org.uk/online-applications/)
- [Edinburgh](https://citydev-portal.edinburgh.gov.uk/idoxpa-web/)
- [Enfield](https://planningandbuildingcontrol.enfield.gov.uk/online-applications/)
- [Greenwich](https://planning.royalgreenwich.gov.uk/online-applications/)
- [Hammersmith and Fulham](http://public-access.lbhf.gov.uk/online-applications/)
- [Newcastle City](https://publicaccessapplications.newcastle.gov.uk/online-applications/)
- [Newham](https://pa.newham.gov.uk/online-applications/)
- [Lambeth](https://planning.lambeth.gov.uk/online-applications/)
- [Lewisham](https://planning.lewisham.gov.uk/online-applications/)
- [London Legacy](http://planningregister.londonlegacy.co.uk/)
- [Norwich City](https://planning.norwich.gov.uk/online-applications/)
- [Manchester](https://pa.manchester.gov.uk/online-applications/)
- [Southwark](https://planning.southwark.gov.uk/online-applications/)
- [Sutton](http://planningregister.sutton.gov.uk/online-applications/)
- [Tower Hamlets](https://development.towerhamlets.gov.uk/online-applications/)
- [Wakefield](https://planning.wakefield.gov.uk/online-applications/)
- [Westminster](https://idoxpa.westminster.gov.uk/online-applications/)

If you would like another planning portal domain to be added please [create an issue on GitHub](https://github.com/StudioLE/PlanningApplicationDownloader/issues/new). Or if you have a little coding experience you can create a pull request after forking the repository and adding the details of the portal to the following files:

```
README.md
src/manifest.json
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