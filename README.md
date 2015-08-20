# metalsmith-rootpath [![Build Status](https://travis-ci.org/radiovisual/metalsmith-rootpath.svg)](https://travis-ci.org/radiovisual/metalsmith-rootpath)
> Easily find the relative path to the root directory in your Metalsmith templates. 

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

Now you have a `rootPath` value assigned to the metadata of the files in your Metalsmith build. 
**This is useful when building relative links!**

## Examples

Lets assume you have a directory structure like this:

```
        index.html
        dir1/
           index.html
        dir2/
           dir2a/
              index.html
        dir3/
           dir3a/
              dir3b/
                 dir3c/
                   index.html
```

The `rootPath` values in each index.html file would be:

| File                               | `rootPath`        |
| -----------------------------------|-------------------|
| index.html                         | ""                | 
| dir1/index.html                    | "../"             |
| dir2/dir2a/index.html              | "../../"          |   
| dir3/dir3a/dir3b/dir3c/index.html  | "../../../../"    | 


#### Relative Links
Use the `rootPath` variable anywhere you want to grab static files relative to your directory. 
*Note that I am using the Handlebars syntax, but the `rootPath` value is assigned to the file's metadata, so it can 
be accessed within any template engine.*
 
```html
<link src="{{rootPath}}main.css" type="text/css" />
```

#### Relative Navigation

This `rootPath` variable is useful when building a relative navigation structure, for example, in your Handlebars 
template `partial/navigation.hbs`

```html
<ul>
    <li><a href="{{rootPath}}about/">About Us</a></li>
    <li><a href="{{rootPath}}awesome-page/">Awesome Page</a></li>
    <li><a href="{{rootPath}}contact/">Contact Us</a></li>
</ul>
```

### Important Notes

1. This plugin is only useful if your `build/` directory is identical to your `src/` structure. Meaning, none of the 
Metalsmith plugins you have on your build chain change the directory structure you have presented in your `src` folder.

### License 

MIT @ [Michael Wuergler](http://www.numetriclabs.com)


