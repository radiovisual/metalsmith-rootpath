# metalsmith-rootpath

> Easily find the relative path to the root directory in your Metalsmith templates.
> 
> *Makes relative-to-root links a breeze!*

[![Build Status](https://travis-ci.org/radiovisual/metalsmith-rootpath.svg)](https://travis-ci.org/radiovisual/metalsmith-rootpath)

**Note:** metalsmith-rootpath must run **after** any plugins that move files around, or create new files in your
metalsmith build chain (like [metalsmith-permalinks](https://github.com/segmentio/metalsmith-permalinks), for example).
This is because metalsmith-rootpath needs to know what your final output directory will look like before it can assign
a correct rootPath value. 


## Install

```
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

:sunglasses: **Now all the files and templates in your Metalsmith build have a `rootPath` variable assigned to them!**
I am using the handlebars template in the examples below, but you can use your template language of choice, or access
the rootPath value from the file's metadata in anyway you like.


## Examples

Let's assume you have a directory structure like this:

    .
    ├── index.html
    │
    ├─┬ dir1/
    │ └── index.html
    │  
    ├─┬ dir2/ 
    │ └─┬ foo/
    │   └── index.html
    │
    └─┬ dir3/ 
      └─┬ foo/
        └─┬ bar/
          └─┬ baz/
            └── index.html



The `rootPath` values in each `index.html` file would be:

| File                               | `rootPath`        |
| :----------------------------------|:------------------|
| index.html                         | ""                | 
| dir1/index.html                    | "../"             |
| dir2/foo/index.html                | "../../"          |   
| dir3/foo/bar/baz/index.html        | "../../../../"    | 



## Relative Links  

Use the `rootPath` variable anywhere you want to grab static files relative to your directory. `rootPath` will 
find the root folder no matter how many levels deep your templates are.

For example, if the following line of markup were placed in `dir3/foo/bar/baz/index.html`:
```html
<link src="{{rootPath}}css/main.css" type="text/css" />
```

It would result in the following output:
```html
<link src="../../../../css/main.css" type="text/css" />
```


## Relative Navigation  

This `rootPath` variable is useful when building a relative navigation structure, for example, in your Handlebars 
template `partials/navigation.hbs`

```html
<ul>
    <li><a href="{{rootPath}}about/">About Us</a></li>
    <li><a href="{{rootPath}}awesome-page/">Awesome Page</a></li>
    <li><a href="{{rootPath}}contact/">Contact Us</a></li>
</ul>
```


### License  

MIT @ [Michael Wuergler](http://www.numetriclabs.com)


