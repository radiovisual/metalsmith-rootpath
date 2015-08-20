# metalsmith-rootpath [![Build Status](https://travis-ci.org/radiovisual/metalsmith-rootpath.svg)](https://travis-ci.org/radiovisual/metalsmith-rootpath)
> Easily find the relative path to the root directory in your Metalsmith templates.
> 
> *Makes relative links a breeze!*

## Install
```sh
$ npm install --save metalsmith-rootpath
```
    
## Usage
```js
var rootPath = require('metalsmith-rootpath');

Metalsmith(__dirname)
  .use(rootPath())
  .build(function(err) {
    if (err) throw err;
  });
  
```

**Now you have a `rootPath` value assigned to the metadata of the files in your Metalsmith build.** 

## Examples

Lets assume you have a directory structure like this:

```
        index.html
        dir1/
           index.html
        dir2/
           foo/
              index.html
        dir3/
           foo/
              bar/
                 baz/
                   index.html
```

The `rootPath` values in each `index.html` file would be:

| File                               | `rootPath`        |
| :----------------------------------|:------------------|
| index.html                         | ""                | 
| dir1/index.html                    | "../"             |
| dir2/foo/index.html                | "../../"          |   
| dir3/foo/bar/baz/index.html        | "../../../../"    | 


#### Relative Links
Use the `rootPath` variable anywhere you want to grab static files relative to your directory. 
 
```html
<link src="{{rootPath}}css/main.css" type="text/css" />
```

`rootPath` will dynamically find the root folder no matter how many levels deep your templates are. Assume you have a 
template file at this location: `/foo/bar/baz/biz/index.html`, the generated HTML from the above template code would be:

```html
<link src="../../../../css/main.css" type="text/css" />
```

#### Relative Navigation

This `rootPath` variable is useful when building a relative navigation structure, for example, in your Handlebars 
template `partials/navigation.hbs`

```html
<ul>
    <li><a href="{{rootPath}}about/">About Us</a></li>
    <li><a href="{{rootPath}}awesome-page/">Awesome Page</a></li>
    <li><a href="{{rootPath}}contact/">Contact Us</a></li>
</ul>
```

### Important Notes

1. I am using the Handlebars syntax in the above examples, but the `rootPath` value is assigned to every file's metadata, 
so it can be accessed just as easily with your template language of choice.
1. This plugin is only useful if your `build/` directory is identical to your `src/` structure. Meaning, none of the 
Metalsmith plugins you have on your build chain change the directory structure you have presented in your `src` folder.

### License 

MIT @ [Michael Wuergler](http://www.numetriclabs.com)


