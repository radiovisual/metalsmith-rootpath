'use strict';

/**
 * Expose `plugin`.
 */
module.exports = plugin;


/**
 * Metalsmith plugin that sets a `rootPath` variable on each file's metadata.
 * This allows you to find relative paths in your templates easily.
 *
 * @return {Function}
 */
function plugin(){

    return function(files, metalsmith, done){

        Object.keys(files).forEach(function(file){

            var re = /(\/)+/g;

            var rootPath = "";
            var myArray;
            while ((myArray = re.exec(file)) !== null) {
                rootPath += "../";
            }

            files[file].rootPath = rootPath;

        });

        done();
    }
}